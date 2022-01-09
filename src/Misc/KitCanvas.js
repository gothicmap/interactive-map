import {createContext, useContext, useEffect, useRef, useState} from "react";

const CanvasKitInit = require('canvaskit-wasm/bin/canvaskit.js')
export const loadCanvasKit = (onLoad) => {
    CanvasKitInit({
        locateFile: (file) => file
    }).then((CanvasKit) => {
        onLoad(CanvasKit)
    })
}

export const CanvasKitContext = createContext(null)
export const CanvasKitProvider = CanvasKitContext.Provider

export const KitCanvas = ({fetchRenderData, draw, reDraw, dimensionsCallback, ...props}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const reDrawRef = reDraw ? reDraw : useRef(true)
    const kit = useContext(CanvasKitContext)
    const [renderData, setRenderData] = useState(null)
    const canvasRef = useRef(null)
    const surface = useRef(null)
    const prevSurface = useRef(null)

    useEffect(() => {
        fetchRenderData(renderData, setRenderData, kit)
        return () => {
            if (surface.current) {
                surface.current.delete()
                surface.current = null
            }
            if (prevSurface.current) {
                prevSurface.current.delete()
                prevSurface.current = null
            }
        }
    }, [])

    const internalDraw = (canvas) => {
        let localCanvas = canvas
        const canvasHtmlElement = canvasRef.current

        if (!canvasHtmlElement) {
            return
        }

        const canvasRect = canvasHtmlElement.getBoundingClientRect()

        // remove previous surface
        if (prevSurface.current) {
            prevSurface.current.delete()
            prevSurface.current = null
        }

        if (canvasHtmlElement.width !== canvasRect.width || canvasHtmlElement.height !== canvasRect.height) {
            canvasHtmlElement.width = canvasRect.width
            canvasHtmlElement.height = canvasRect.height
        }

        if (surface.current.height() !== canvasHtmlElement.height || surface.current.width() !== canvasHtmlElement.width) {
            prevSurface.current = surface.current
            surface.current = kit.MakeCanvasSurface(canvasHtmlElement)
            localCanvas = surface.current.getCanvas()
            reDrawRef.current = true
            if(dimensionsCallback) {
                dimensionsCallback(surface.current.width(), surface.current.height())
            }
        }

        if (reDrawRef.current) {
            localCanvas.clear(kit.WHITE)
            localCanvas.save()
            draw(renderData, localCanvas, surface.current)
            localCanvas.restore()
            surface.current.flush()
            reDrawRef.current = false
        }

        surface.current.requestAnimationFrame(internalDraw)
    }

    useEffect(() => {
        const canvasRefl = canvasRef.current

        if (!(canvasRefl && renderData)) {
            return
        }

        if (surface.current === null) {
            surface.current = kit.MakeCanvasSurface(canvasRefl)
        }

        surface.current.requestAnimationFrame(internalDraw)
    }, [renderData])

    return <canvas ref={canvasRef} {...props} />
}