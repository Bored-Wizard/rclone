import { useEffect, useRef, useState } from "react";
import "./App.scss";
import useElementOnScreen from "./useElementOnScreen";
import ReactLoading from 'react-loading';
import { FaThumbsUp, FaThumbsDown, FaRegComment, FaEllipsisH } from "react-icons/fa";

const App = () => {
  const [videoList, setvideoList] = useState({
    0: {
      shuldPlay: false,
      link: "https://www.w3schools.com/html/mov_bbb.mp4",
      hide: true
    },
    1: {
      shouldPlay: false,
      link: "https://testreels.000webhostapp.com/249802635_453557342789743_3932284837316691868_n.mp4",
      hide: true
    },
  })
  let videoLink = [
    "https://testreels.000webhostapp.com/248366881_139505101746713_1972683961191649361_n.mp4",
    "https://testreels.000webhostapp.com/249802635_453557342789743_3932284837316691868_n.mp4",
    "https://testreels.000webhostapp.com/257733951_4815316655187664_3402811816715211412_n.mp4",
    "https://testreels.000webhostapp.com/260511436_608874900530281_7764772624404776049_n.mp4",
    "https://testreels.000webhostapp.com/260823702_191446829853682_7879365633916055829_n.mp4",
    "https://testreels.000webhostapp.com/262562752_623473069071289_6627225333917474758_n.mp4",
    "https://testreels.000webhostapp.com/262793529_3022087951337617_6478478748977900225_n.mp4",
    "https://testreels.000webhostapp.com/262793529_3022087951337617_6478478748977900225_n(1).mp4",
    "https://testreels.000webhostapp.com/264022308_132475985877741_2537757629487660288_n.mp4",
    "https://testreels.000webhostapp.com/264356435_293075089409551_402992719722109385_n.mp4",
  ]
  const targetRef = useRef([]);
  const currentID = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  }, targetRef)

  useEffect(() => {
    if (currentID) {
      const ele = document.getElementById(String(currentID))
      if (ele) {
        ele.children[0].paused ? ele.children[0]?.play() : <></>
      }
    }
    return () => {
      const ele = document.getElementById(String(currentID))
      if (ele) {
        ele.children[0].pause()
      }
    }
  }, [targetRef, currentID])

  const handlePausePlay = (index, e) => {
    const ele = document.getElementById(index)
    if (ele) {
      if (e.detail === 1) {
        ele.children[0].paused ? ele.children[0]?.play() : ele.children[0]?.pause()

      } else if (e.detail === 2) {
        ele.children[0].play()
        handleLike(String(index))
      }

    }
  }
  const handleHide = index => {
    const ele = document.getElementById(`hide${index}`);
    ele.className += "hide"
  }

  const handleLike = index => {
    if (currentID) {
      const ele = document.getElementById(`like${index}`)
      if (ele) {
        if (ele.classList.contains("activated")) {
          ele.classList.remove("activated")
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "like",
              message: "like unClicked",
              data: { like: false }
            }))
          }
        } else {
          const ele2 = document.getElementById(`dislike${index}`)
          if (ele2) {
            if (ele2.classList.contains("activated")) {
              ele2.classList.remove("activated")
              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: "dislike",
                  message: "dislike unClicked",
                  data: { dislike: false }
                }))
              }
            }
          }
          ele.classList.add("activated")
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "like",
              message: "like Clicked",
              data: { like: true }
            }))
          }
        }
      }
    }
  }

  const handleDislike = index => {
    if (currentID) {
      const ele = document.getElementById(`dislike${index}`)
      if (ele) {
        if (ele.classList.contains("activated")) {
          ele.classList.remove("activated")
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "dislike",
              message: "dislike unClicked",
              data: { dislike: false }
            }))
          }
        } else {
          const ele2 = document.getElementById(`like${index}`)
          if (ele2) {
            if (ele2.classList.contains("activated")) {
              ele2.classList.remove("activated")
              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: "like",
                  message: "like unClicked",
                  data: { dislike: false }
                }))
              }
            }
          }
          ele.classList.add("activated")
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "dislike",
              message: "dislike Clicked",
              data: { dislike: true }
            }))
          }
        }
      }
    }
  }

  const handleComment = index => {
    if (currentID) {
      const ele = document.getElementById(`comment${index}`)
      if (ele) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "comments",
            message: "comments Clicked",
            data: {}
          }))
        }
      }
    }
  }

  const handleDescription = index => {
    if (currentID) {
      const ele = document.getElementById(`description${index}`)
      if (ele) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "description",
            message: "description Clicked",
            data: {}
          }))
        }
      }
    }
  }

  const removeOverlay = index => {
    console.log(targetRef[Number(index)])
  }

  const handleUserDescription = index => {
    if (currentID) {
      const ele = document.getElementById(`userDescription${index}`)
      if (ele) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "userDescription",
            message: "userDescription Clicked",
            data: {}
          }))
        }
      }
    }
  }

  const [loadingVideo, setloadingVideo] = useState(false)
  const handleScroll = e => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "scroll",
        message: { a: Math.floor(scrollHeight) - scrollTop - 65, b: clientHeight },
        data: { like: false }
      }))
    }
    if (scrollHeight - scrollTop - 65 < clientHeight) {
      let keyq = Object.keys(videoList).length + 1
      let bufferVideoList = videoList;
      bufferVideoList[keyq] = {
        shouldPlay: false,
        link: videoLink[Math.floor(Math.random() * 10)],
        hide: true
      }
      setvideoList(bufferVideoList)
      setloadingVideo(!loadingVideo)
    }
  }

  useEffect(() => {

  }, [videoList, loadingVideo])

  const handleVideoError = e => {
    console.log({...e});
  }
  return (
    <div className="Container noScrollbar" onScroll={e => handleScroll(e)} >
      {
        Object.values(videoList).map((item, index) => {
          return (
            <div
              ref={el => targetRef.current[index] = el}
              key={index} id={String(index)} className=" bg-gray-500 sn relative "  >
              <video onError={e => handleVideoError(e)} onLoadStart={() => {}} onLoadedDataCapture={() => {}} onLoadedData={() => { handleHide(index) }} onClick={(e) => { handlePausePlay(String(index), e) }} className="videoo" autoPlay={false} height="100%" preload="auto" loop={true} >
                <source src={item.link} type="video/mp4" />
              </video>
              <div className="ratingOverlay" >
                <FaThumbsUp onClick={() => { handleLike(String(index)) }} id={`like${index}`} className="like" size={27} />
                <FaThumbsDown onClick={() => { handleDislike(String(index)) }} id={`dislike${index}`} className="dislike" size={27} />
                <FaRegComment onClick={() => { handleComment(String(index)) }} id={`comment${index}`} className="comment" size={27} />
                <FaEllipsisH onClick={() => { handleDescription(String(index)) }} id={`description${index}`} className="description" size={27} />
              </div>
              <div id={`userDescription${index}`} className="UserDescriptionOverlay" onClick={() => handleUserDescription(String(index))} >
                <span>James Steven Donaldson (born May 7, 1998), better known by his online alias MrBeast (formerly MrBeast6000), is an American YouTuber, businessman, and philanthropist. He has been credited with pioneering a genre of YouTube videos that center on expensive stunts.</span>
              </div>
              <div id={`hide${index}`}  className="upperBoss is-loading " >
                <div className="userDes"></div>
              </div> 
            </div>
          )
        })
      }
      <div className="loadingOverlay w-screen"  >
        <ReactLoading type="cylon" color="gray" className="loader " />
      </div>
    </div>
  )
}

export default App;
