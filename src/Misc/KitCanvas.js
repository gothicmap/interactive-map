import {useEffect, useRef, useState} from "react";

export const KitCanvas = ({fetchRenderData, draw, reDraw, dimensionsCallback, ...props}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const reDrawRef = reDraw ? reDraw : useRef(true)
    const [renderData, setRenderData] = useState(null)
    const canvasRef = useRef(null)

    useEffect(() => {
        fetchRenderData(renderData, setRenderData)
        return () => {
        }
    }, [])

    const internalDraw = (timestamp) => {
        const canvasHtmlElement = canvasRef.current

        if (!canvasHtmlElement) {
            return
        }

        const canvasRect = canvasHtmlElement.getBoundingClientRect()
        // size are not exact, we can negate 1 pixel difference for resizing
        const rectWidth = canvasRect.width | 0
        const rectHeight = canvasRect.height | 0
        if (Math.abs(canvasHtmlElement.width - rectWidth) > 1
            || Math.abs(canvasHtmlElement.height - rectHeight) > 1) {
            canvasHtmlElement.width = rectWidth
            canvasHtmlElement.height = rectHeight
            dimensionsCallback(rectWidth, rectHeight)
            reDrawRef.current = true
        }

        if (reDrawRef.current) {
            const context = canvasHtmlElement.getContext('2d');
            context.clearRect(0, 0, canvasHtmlElement.width, canvasHtmlElement.height);
            draw(renderData, context)
            context.resetTransform()
            reDrawRef.current = false
        }

        window.requestAnimationFrame(internalDraw)
    }

    useEffect(() => {
        const canvasRefl = canvasRef.current

        if (!(canvasRefl && renderData)) {
            return
        }

        window.requestAnimationFrame(internalDraw)
    }, [renderData])

    return <canvas ref={canvasRef} {...props} style={{
        touchAction: "none"
    }}/>
}