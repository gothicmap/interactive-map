import {CanvasKitContext, KitCanvas} from "../Misc/KitCanvas";
import * as React from "react";
import {useContext, useEffect, useRef, useState} from "react";
// import {createKdTree} from "kd.tree";
import {useGesture} from "@use-gesture/react";
import {AbsTooltip} from "./AbsTooltip";
import {mapPinsSelector, scaleFamily} from "./MapState";
import {useRecoilStateEx, useRecoilValueRef, useRefObj} from "../Misc/StateHelpers";
import {PinTooltip, ShowPinModal} from "./Pins/PinTooltip";
import {useModal} from "mui-modal-provider";

const mapImage = require('../archolos_map.png')
// const containers = require('../containers.json')
// const minx = -128070.0
// const maxy = -39108.0
// const maxx = 31929.0
// const miny = -199108

const xdiff = 128070.0;
const ydiff = 199108.0;
const ydiv = 1600.0;
const xdiv = 1599.99;

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


class RenderState {
    constructor() {
        this.highlightedPin = null
        this.defaultPoint = null
        this.highlightPoint = null
        this.showPins = true
        this.mapScale = 100
        this.maxDistance = calcMaxDistance(100)
        this.mapScale1 = 1.0
        this.yDiff = 0.0
        this.xDiff = 0.0
        this.canvasX = 0
        this.canvasY = 0
        this.midPointShiftX = 0
        this.midPointShiftY = 0
    }

    updateScale = (newScale) => {
        this.mapScale = newScale
        this.mapScale1 = scale1(newScale)
        this.maxDistance = calcMaxDistance(newScale)
        this.recalculateMidPoint()
    }

    recalculateMidPoint = () => {
        const halfOfDim = (mapDimensions * this.mapScale1) / 2
        const xHalf = this.canvasX / 2.0
        const yHalf = this.canvasY / 2.0

        this.midPointShiftX = xHalf - halfOfDim
        this.midPointShiftY = yHalf - halfOfDim
    }

    updateCanvasDimensions = (x, y) => {
        this.canvasX = x
        this.canvasY = y
        this.recalculateMidPoint()
    }

    pointCanvasToPoint01 = (canvasX, canvasY) => {
        const x = ((canvasX - this.xDiff - this.midPointShiftX) / (mapDimensions * this.mapScale1))
        const y = ((canvasY - this.yDiff - this.midPointShiftY) / (mapDimensions * this.mapScale1))
        return [x, y]
    }

    point01ToCanvasPoint = (p01x, p01y, shiftX = 0, shiftY = 0) => {
        const x = shiftX + this.xDiff + this.midPointShiftX + mapDimensions * this.mapScale1 * p01x
        const y = shiftY + this.yDiff + this.midPointShiftY + mapDimensions * this.mapScale1 * p01y
        return [x, y]
    }

    drag = (dx, dy) => {
        this.xDiff += dx
        this.yDiff += dy
    }

    handleHighlightPin = (closestPin, shiftX, shiftY, pointUpdatedCallback) => {
        if (closestPin) {
            if (this.highlightedPin === null || closestPin.vobObjectID !== this.highlightedPin.vobObjectID) {
                // new point selected
                this.highlightedPin = closestPin
                // scale point from [0, 1] to absolute mouse position
                const [px, py] = this.point01ToCanvasPoint(closestPin.normPosition.x, closestPin.normPosition.y, shiftX, shiftY)
                pointUpdatedCallback(px, py, closestPin)
            }
        } else {
            if (this.highlightedPin) {
                this.highlightedPin = null
                pointUpdatedCallback(undefined, undefined, undefined)
            }
        }
    }
}

export const Map = ({mapId}) => {
    const kit = useContext(CanvasKitContext)

    const renderState = useRefObj(() => new RenderState())

    const updateScale = (newScale) => {
        renderState.updateScale(newScale)
        reDraw.current = true
    }

    const [, setMapScale] = useRecoilStateEx(scaleFamily(mapId), updateScale)

    const reDraw = useRef(false)
    // const canvasDimensions = useRef({width: 0, height: 0})

    useEffect(() => {
        renderState.defaultPoint = new kit.Paint();
        renderState.defaultPoint.setColor(kit.Color(0, 255, 0, 1.0));
        renderState.defaultPoint.setAntiAlias(true)

        renderState.highlightPoint = new kit.Paint();
        renderState.highlightPoint.setColor(kit.Color(255, 0, 0, 1.0));
        renderState.highlightPoint.setAntiAlias(true)

        return () => {
            if (renderState.defaultPoint) {
                renderState.defaultPoint.delete()
            }
            if (renderState.highlightPoint) {
                renderState.highlightPoint.delete()
            }
        }
    }, [])

    const fetchMapImage = (current, set, kit) => {
        if (current === null) {
            fetch(mapImage)
                .then((response) => response.arrayBuffer()
                    .then((buffer) => set(kit.MakeImageFromEncoded(buffer))));
        }
    }

    const pinsData = useRecoilValueRef(mapPinsSelector(mapId), () => reDraw.current = true)

    const draw = (map, canvas) => {
        canvas.translate(renderState.midPointShiftX, renderState.midPointShiftY)
        canvas.translate(renderState.xDiff, renderState.yDiff)
        canvas.scale(renderState.mapScale1, renderState.mapScale1)

        canvas.drawImageOptions(map, 0, 0, kit.FilterMode.Linear, kit.MipmapMode.Linear)

        if (renderState.showPins) {
            let lastPin = null

            pinsData.current.pins.forEach((c) => {
                if (renderState.highlightedPin !== null && renderState.highlightedPin.vobObjectID === c.vobObjectID) {
                    lastPin = c
                } else {
                    canvas.drawCircle(c.normPosition.x * mapDimensions, c.normPosition.y * mapDimensions, 5 / renderState.mapScale1, renderState.defaultPoint)
                }
            })

            if (lastPin) {
                canvas.drawCircle(lastPin.normPosition.x * mapDimensions, lastPin.normPosition.y * mapDimensions, 5 / renderState.mapScale1, renderState.highlightPoint)
            }
        }
    }

    const handleDrag = (evt) => {
        if (renderState.highlightedPin === null) {
            renderState.drag(evt.delta[0], evt.delta[1])
            reDraw.current = true
        }
    }

    const handleWheel = ({event, delta, active}) => {
        if (active) {
            setMapScale(renderState.mapScale - (delta[1] / 10))
        }
    }

    const [tooltipData, setTooltipData] = useState(null)


    const handleMove = ({xy, currentTarget, event, ...others}) => {
        if (!pinsData.current) {
            return
        }

        const rect = currentTarget.getBoundingClientRect();
        // scale mouse absolute position to [0, 1]
        const [x, y] = renderState.pointCanvasToPoint01(xy[0] - rect.left, xy[1] - rect.top)

        const closestPoint = pinsData.current.nearest(x, y, renderState.maxDistance)

        if (closestPoint.length === 1) {
            const kdNode = closestPoint[0][0]
            const closestPin = kdNode.pin
            renderState.handleHighlightPin(closestPin, rect.left, rect.top, (px, py, pin) => {
                setTooltipData({pos: {x: px, y: py}, data: <PinTooltip pin={pin}/>})
                reDraw.current = true
            })
        } else {
            // no closest point found
            renderState.handleHighlightPin(null, null, null, () => {
                if (tooltipData) {
                    setTooltipData(null)
                }
                reDraw.current = true
            })
        }
    }

    const {showModal} = useModal();

    const handlePointerUp = (evt) => {
        if (renderState.highlightedPin !== null) {
            ShowPinModal(renderState.highlightedPin, showModal)
        }
    }
    const setupGestures = useGesture(
        {
            onDrag: handleDrag,
            onMove: handleMove,
            onWheel: handleWheel,
            onPointerUp: handlePointerUp
        }
    )

    return <div style={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1000,
        minHeight: "1px",
        minWidth: "1px"
    }}>
        {Boolean(tooltipData) && <AbsTooltip x={tooltipData.pos.x} y={tooltipData.pos.y} data={tooltipData.data}/>}
        <KitCanvas {...setupGestures()}
                   reDraw={reDraw}
                   fetchRenderData={fetchMapImage}
                   dimensionsCallback={renderState.updateCanvasDimensions}
                   draw={draw} style={{
            flexGrow: 1,
            minHeight: "1px",
            minWidth: "1px"
        }}
        />
    </div>
}