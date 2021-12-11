import { useState, useRef, useMemo, useEffect } from "react";

const useElementOnScreen = (options, targetRef) => {
    const [isVisible, setisVisible] = useState(false);
    const [currentKey, setcurrentKey] = useState(null)

    const callBackFunction = entries => {
        entries.map(item => {
            if (item.isIntersecting) {
                let target = { ...item.target }
                let targetList = Object.values(target)
                // console.log(targetList[0].key)
                setcurrentKey(targetList[0].key)
            }
        })
    }

    const optionsMemo = useMemo(() => {
        return options
    })

    useEffect(() => {
        const observer = new IntersectionObserver(callBackFunction, optionsMemo);
        const currentTarget = targetRef.current;
        currentTarget.map(item => {
            observer.observe(item)
        })
        // if (currentTarget) observer.observe(currentTarget)

        return () => {
            // if (currentTarget) observer.unobserve(currentTarget)
            currentTarget.map(item => {
                observer.unobserve(item)
            })
        }
    }, [optionsMemo, targetRef])

    return currentKey;
}

export default useElementOnScreen;