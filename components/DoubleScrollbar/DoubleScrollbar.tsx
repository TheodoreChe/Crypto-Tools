import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type DoubleScrollbarProps = {
  children: ReactNode
  className?: string
}

const TopScrollbarWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
`

const TopScrollbarInner = styled.div`
  padding-top: 1px;
`

const ChildrenWrapper = styled.div`
  overflow: auto;
`

function DoubleScrollbar({ children, className }: DoubleScrollbarProps): JSX.Element {
  const topScrollbarWrapperRef = useRef<HTMLDivElement>(null)
  const topScrollbarInnerRef = useRef<HTMLDivElement>(null)
  const childrenWrapperRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<string>('auto')

  const getChildWrapperWidth = () => {
    const scrollWidth = childrenWrapperRef.current?.scrollWidth
    if (!scrollWidth) {
      return 'auto'
    }
    return scrollWidth + 'px'
  }

  const calculateWidth = () => {
    let childWrapperWidth = getChildWrapperWidth()

    if (childWrapperWidth !== width) {
      setWidth(childWrapperWidth)
    }
  }

  useEffect(() => {
    calculateWidth()
  }, [children])

  useEffect(() => {
    window.addEventListener('resize', calculateWidth)

    const topScrollbarWrapper = topScrollbarWrapperRef.current
    const childrenWrapper = childrenWrapperRef.current

    if (!topScrollbarWrapper || !childrenWrapper) {
      return
    }

    topScrollbarWrapper.onscroll = function () {
      childrenWrapper.scrollLeft = topScrollbarWrapper.scrollLeft
    }

    childrenWrapper.onscroll = function () {
      topScrollbarWrapper.scrollLeft = childrenWrapper.scrollLeft
    }
  }, [])

  return (
    <>
      <TopScrollbarWrapper ref={topScrollbarWrapperRef}>
        <div style={{ width }} ref={topScrollbarInnerRef}>
          &nbsp;
        </div>
      </TopScrollbarWrapper>
      <ChildrenWrapper ref={childrenWrapperRef} className={className}>
        {children}
      </ChildrenWrapper>
    </>
  )
}

export default DoubleScrollbar
