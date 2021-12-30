import { useEffect, useRef, useState } from "react";
import "./App.scss";
import useElementOnScreen from "./useElementOnScreen";
import ReactLoading from 'react-loading';
import { FaThumbsUp, FaThumbsDown, FaRegComment, FaEllipsisH } from "react-icons/fa";

const App = () => {
  const [videoList, setvideoList] = useState({});
  const [videoLink, setvideoLink] = useState([]);
  const [change, setchange] = useState(false)
  const targetRef = useRef([]);
  const currentID = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  }, targetRef)

  useEffect(() => {
    window.windowFunction = (e) => {
      let bufferObject = {};
      if (e) {
        for (let i = 0; i < e.length; i++) {
          bufferObject[i + e.length] = e[i]
        }
      }
      console.log(bufferObject)
      setvideoList(bufferObject);
      setchange(!change)
    }
  }, [])

  useEffect(() => {
    window.initialFunction = (e) => {
      let bufferObject = {};
      if (e) {
        for (let i = 0; i < e.length; i++) {
          bufferObject[i] = e[i]
        }
      }
      console.log(bufferObject)
      setvideoList(bufferObject);
      setchange(!change)
    }
  }, [])

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    console.log(currentID)
    if (currentID === String(Object.keys(videoList).length - 1)) {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "currentVidId",
          message: "userDescription Clicked",
          data: { currentID }
        }))
      }
      if (videoLink.length > 0) {
        // if(videoLink)
        let bufferVideoList = videoList;
        let rand = Math.floor(Math.random() * videoLink.length)
        bufferVideoList[Object.keys(videoList).length + 1] = videoLink[rand];
        setvideoList(bufferVideoList)
      }
      if (videoLink.length <= Object.keys(videoList).length) {
      }
    }
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
  }, [targetRef, currentID, videoList])

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
    const ele0 = document.getElementById(`hide${index}`);
    const ele = document.getElementById(`vidLoad${index}`)
    console.log("loaded")
    ele.className += "hide"
    ele0.className += "hide"
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
              data: { dislike: false, data: videoList[Number(index)] }
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
                  data: { dislike: false, data: videoList[Number(index)] }
                }))
              }
            }
          }
          ele.classList.add("activated")
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "dislike",
              message: "dislike Clicked",
              data: { dislike: true, data: videoList[Number(index)] }
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
            data: { data: videoList[Number(index)] }
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
            data: { data: videoList[Number(index)] }
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
            data: { data: videoList[Number(index)] }
          }))
        }
      }
    }
  }

  const [loadingVideo, setloadingVideo] = useState(false)
  // const handleScroll = e => {
  //   const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
  //   if (window.ReactNativeWebView) {
  //     window.ReactNativeWebView.postMessage(JSON.stringify({
  //       type: "scroll",
  //       message: { a: Math.floor(scrollHeight) - scrollTop - 65, b: clientHeight },
  //       data: { like: false }
  //     }))
  //   }
  //   if (scrollHeight - scrollTop - 65 < clientHeight) {
  //     let keyq = Object.keys(videoList).length + 1
  //     let bufferVideoList = videoList;
  //     bufferVideoList[keyq] = {
  //       shouldPlay: false,
  //       link: videoLink[Math.floor(Math.random() * 10)],
  //       hide: true
  //     }
  //     setvideoList(bufferVideoList)
  //     setloadingVideo(!loadingVideo)
  //   }
  // }

  useEffect(() => {

  }, [videoList, loadingVideo])

  const handleLoading = (index, e) => {
    // console.log("loading")
    // const video = document.getElementById(`video${index}`)
    // const ele = document.getElementById(`vidLoad${index}`)
    // if (video.buffered.length === 0) {
    //   ele.className += "hide";
    // }
    // console.log(video.buffered.length)
  }

  // const handleLoaded = (index, e) => {
  //   console.log("loaded")
  //   const ele = document.getElementById(`vidLoad${index}`)
  //   if (ele) {
  //     ele.className -= "hide"
  //   }
  // }

  const handleFollowhm = (index) => {
    const ele = document.getElementById(`userFoloweArea${index}`)
    if (ele) {
      if (ele.innerText === "Following") {
        ele.innerText = "Follow"
      } else if (ele.innerText === "Follow") {
        ele.innerText = "Following"
      }
    }
  }

  const handleVideoError = e => {
    console.log(e);
  }
  return (
    <div className="Container noScrollbar" >
      {
        Object.values(videoList).map((item, index) => {
          console.log(item)
          return (
            <div
              ref={el => targetRef.current[index] = el}
              key={index} id={String(index)} className=" bg-gray-500 sn relative "  >
              <video preload="auto" id={`video${index}`} onError={e => handleVideoError(e)} onWaiting={(e) => { handleLoading(String(index), e) }} onLoadedData={() => { handleHide(index) }} onClick={(e) => { handlePausePlay(String(index), e) }} className="videoo" autoPlay={false} height="100%" preload="auto" loop={true} >
                <source src={item.link} type="video/mp4" />
              </video>
              <div className="ratingOverlay" >
                <FaThumbsUp onClick={() => { handleLike(String(index)) }} id={`like${index}`} className="like" size={27} />
                <FaThumbsDown onClick={() => { handleDislike(String(index)) }} id={`dislike${index}`} className="dislike" size={27} />
                <FaRegComment onClick={() => { handleComment(String(index)) }} id={`comment${index}`} className="comment" size={27} />
                <FaEllipsisH onClick={() => { handleDescription(String(index)) }} id={`description${index}`} className="description" size={27} />
                <div className="userdparea" >
                  <ReactLoading type="cylon" color="white" className="loader" width={"20px"} />
                </div>
              </div>
              <div id={`userDescription${index}`} className="UserDescriptionOverlay">
                <div className="userDataArea" >
                  <div className="userProfileImageArea" onClick={() => handleUserDescription(String(index))}  >
                    <img src="https://www.w3schools.com/images/lamp.jpg" alt="" height="25px" width="25px"></img>
                  </div>
                  <span className="userNameArea" onClick={() => handleUserDescription(String(index))}  >Sujan barman</span>
                  <div id={`userFoloweArea${index}`} className="userFoloweArea" onClick={() => handleFollowhm(String(index))} >
                    Follow
                  </div>
                </div>
                <span > James Steven Donaldson (born May 7, 1998), better known by his online alias MrBeast (formerly MrBeast6000), is an American YouTuber, businessman, and philanthropist.</span>
              </div>
              <div id={`hide${index}`} className="upperBoss is-loading " >
                <div className="userDes"></div>
              </div>
              <div id={`vidLoad${index}`}>
                {/* <ReactLoading type="bubbles" color="gray" className="loader" width={"80px"} /> */}
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
