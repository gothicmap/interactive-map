import {CanvasKitContext, KitCanvas} from "../Misc/KitCanvas";
import {useContext, useEffect, useRef, useState} from "react";
import {createKdTree} from "kd.tree";
import {useGesture} from "@use-gesture/react";
import {AbsTooltip} from "./AbsTooltip";

const mapImage = require('../archolos_map.png')
const containers = require('../containers.json')
// const minx = -128070.0
// const maxy = -39108.0
// const maxx = 31929.0
// const miny = -199108

const xdiff = 128070.0;
const ydiff = 199108.0;
const ydiv = 1600.0;
const xdiv = 1599.99;

const calcCoordinates = (x, z) => {
    const calculatedX = (x + xdiff) / xdiv / 100
    const calculatedY = (z + ydiff) / ydiv / 100
    return [calculatedX, calculatedY]
}

const kdPoints = []

containers.forEach((container, idx) => {
    const [y, x] = calcCoordinates(container.position.x, container.position.z)
    kdPoints.push({
        x: x,
        y: y,
        idx: idx
    })
    container.idx = idx
})

const containerDistance = function (a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

const tree = createKdTree(kdPoints, containerDistance, ['x', 'y'])

const mapDimensions = 1024.0

const scale1 = (scale) => {
    return scale / 100.0
}

const calcMaxDistance = (scale) => {
    return 5 / mapDimensions / scale1(scale)
}

const midpointShift = (canvasDim, _scale1) => {
    const halfOfDim = (mapDimensions * _scale1) / 2
    const xHalf = canvasDim.width / 2.0
    const yHalf = canvasDim.height / 2.0
    return [xHalf - halfOfDim, yHalf - halfOfDim]
}

export const Map = ({...props}) => {
    const kit = useContext(CanvasKitContext)
    const [showMap, setShowMap] = useState(true)
    const reDraw = useRef(false)
    const canvasDimensions = useRef({width: 0, height: 0})
    const stateRef = useRef({
        selectedPin: -1,
        defaultPoint: null,
        highlightPoint: null,
        showPins: true,
        mapScale: 100,
        maxDistance: calcMaxDistance(100),
        mapScale1: 1.0,
        yDiff: 0.0,
        xDiff: 0.0
    })

    const stateObj = stateRef.current

    useEffect(() => {
        stateObj.defaultPoint = new kit.Paint();
        stateObj.defaultPoint.setColor(kit.Color(0, 255, 0, 1.0));
        stateObj.defaultPoint.setAntiAlias(true)

        stateObj.highlightPoint = new kit.Paint();
        stateObj.highlightPoint.setColor(kit.Color(255, 0, 0, 1.0));
        stateObj.highlightPoint.setAntiAlias(true)

        return () => {
            if (stateObj.defaultPoint) {
                stateObj.defaultPoint.delete()
            }
            if (stateObj.highlightPoint) {
                stateObj.highlightPoint.delete()
            }
        }
    }, [])

    const flipShowMap = () => {
        setShowMap(!showMap)
    }

    const flipShowPins = () => {
        stateObj.showPins = !stateObj.showPins
        reDraw.current = true
    }

    const updateScale = (newScale) => {
        stateObj.mapScale = newScale
        stateObj.mapScale1 = scale1(newScale)
        stateObj.maxDistance = calcMaxDistance(newScale)
        reDraw.current = true
    }
    const increaseScale = () => {
        updateScale(stateObj.mapScale + 10)
    }

    const decreaseScale = () => {
        updateScale(stateObj.mapScale - 10)
    }

    const fetchMapImage = (current, set, kit) => {
        if (current === null) {
            fetch(mapImage)
                .then((response) => response.arrayBuffer()
                    .then((buffer) => set(kit.MakeImageFromEncoded(buffer))));
        }
    }

    const center = () => {
        stateObj.xDiff = 0.0
        stateObj.yDiff = 0.0
        reDraw.current = true
    }

    const draw = (map, canvas) => {
        canvas.translate(...midpointShift(canvasDimensions.current, stateRef.current.mapScale1))
        canvas.translate(stateObj.xDiff, stateObj.yDiff)
        canvas.scale(stateObj.mapScale1, stateObj.mapScale1)

        canvas.drawImageOptions(map, 0, 0, kit.FilterMode.Linear, kit.MipmapMode.Linear)

        if (stateObj.showPins) {
            let lastPin = null

            kdPoints.forEach((c) => {
                if (stateObj.selectedPin === c.idx) {
                    lastPin = c
                } else {
                    canvas.drawCircle(c.x * mapDimensions, c.y * mapDimensions, 5 / stateObj.mapScale1, stateObj.defaultPoint)
                }
            })

            if (lastPin) {
                canvas.drawCircle(lastPin.x * mapDimensions, lastPin.y * mapDimensions, 5 / stateObj.mapScale1, stateObj.highlightPoint)
            }
        }
    }

    const handleDrag = (evt) => {
        stateObj.xDiff = stateObj.xDiff + evt.delta[0]
        stateObj.yDiff = stateObj.yDiff + evt.delta[1]
        reDraw.current = true
    }

    const handleWheel = ({event, delta, active}) => {
        if (active) {
            updateScale(stateObj.mapScale - (delta[1] / 10))
        }
    }

    const [tooltipData, setTooltipData] = useState(null)


    const handleMove = ({xy, currentTarget, event, ...others}) => {
        const rect = currentTarget.getBoundingClientRect();
        const _midpointShift = midpointShift(canvasDimensions.current, stateRef.current.mapScale1)

        // scale mouse absolute position to [0, 1]
        const mousePoint = {
            x: ((xy[0] - rect.left - stateObj.xDiff - _midpointShift[0]) / (mapDimensions * stateObj.mapScale1)),
            y: ((xy[1] - rect.top - stateObj.yDiff - _midpointShift[1]) / (mapDimensions * stateObj.mapScale1))
        }

        const closestPoint = tree.nearest(mousePoint, 1, stateObj.maxDistance)

        if (closestPoint.length === 1) {
            const closestIdx = closestPoint[0][0].idx
            // new point selected
            if (closestIdx !== stateObj.selectedPin) {
                stateObj.selectedPin = closestIdx
                // scale point from [0, 1] to absolute mouse position
                const closestPointMidX = rect.left + stateObj.xDiff + _midpointShift[0] + mapDimensions * stateObj.mapScale1 * closestPoint[0][0].x
                const closestPointMidY = rect.top + stateObj.yDiff + _midpointShift[1] + mapDimensions * stateObj.mapScale1 * closestPoint[0][0].y
                // set data for tooltip
                setTooltipData({pos: {x: closestPointMidX, y: closestPointMidY}, data: closestIdx})
                // redraw map image
                reDraw.current = true
            }
        } else {
            // no closest point found
            if (stateObj.selectedPin !== -1) {
                stateObj.selectedPin = -1
                if (tooltipData) {
                    setTooltipData(null)
                }
                reDraw.current = true
            }
        }
    }

    const setupGestures = useGesture(
        {
            onDrag: handleDrag,
            onMove: handleMove,
            onWheel: handleWheel
        }
    )

    return <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
    }}>
        <div style={{
            display: "flex",
            flexDirection: "row",
        }}>
            <button onClick={flipShowPins}>pins control</button>
            <button onClick={flipShowMap}>map control</button>
            <button onClick={increaseScale}>+</button>
            <button onClick={decreaseScale}>-</button>
            <button onClick={center}>center</button>
            {Boolean(tooltipData) && <AbsTooltip x={tooltipData.pos.x} y={tooltipData.pos.y} data={tooltipData.data}/>}

        </div>
        {showMap &&
            <KitCanvas {...setupGestures()}
                       reDraw={reDraw}
                       fetchRenderData={fetchMapImage}
                       dimensions={canvasDimensions}
                       draw={draw} style={{
                flexGrow: 1,
                minHeight: "1px"
            }}
            />
        }
    </div>
}