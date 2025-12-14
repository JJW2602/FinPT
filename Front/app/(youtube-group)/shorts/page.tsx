'use client'

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { extractBoldWords } from "@/lib/utils"
import newsStates from "@/src/recoil/atoms/newAtom"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

const API_KEY = "AIzaSyDUNtRjeG9Y30pvb1aQTT7w7CRSvqA9mLE"
export default function Page() {
    const news = useRecoilValue(newsStates)
    const [labels, setLabels] = useState<string[]>([])
    const [selected, setSelected] = useState('')
    const [items, setItems] = useState<{
        "kind": string,
        "etag": string,
        "id": {
          "kind": string,
          "videoId": string
        }
      }[]>([])

    useEffect(() => {
        if (!news.data) { return }
        const labels = extractBoldWords([news.data?.map((n) => n.word_dictionary)].join(' '))
        setLabels(labels)
        // setSelected(labels[0])
    }, [news])


    useEffect(()=>{
        const keyword = selected ? `#${selected}` : ""
        const queryString = encodeURIComponent(`#쇼츠#금융#경제${keyword}`)
        fetch((`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${queryString}&maxResults=10&key=${API_KEY}`))
        .then((response) => response.json())
        .then((json) => {
            const data = json.items;
            setItems(data)
    
            let html = '';
            // data.forEach((element) => {
            //     html+=`
            //             <li>
            //                 <a href="https://www.youtube.com/watch?v=${element.id.videoId}">
            //                     <img src="${element.snippet.thumbnails.high.url}" alt="">
            //                     <p>${element.snippet.title}</p>
            //                 </a>
            //             </li>`;
            // });
        
        });
    }, [selected])

    return (
    <div className="fixed left-0 right-0 top-0 bottom-16 bg-black text-gray-50">
        <ToggleGroup defaultValue={selected} onValueChange={(value) => setSelected(value)} type="single">
            {
                labels?.map((label) => {
                    return (
                        <ToggleGroupItem key={label} value={label}>#{label}</ToggleGroupItem>
                )
            })
            }
        </ToggleGroup>
        <div className="flex flex-col gap-2 overflow-y-auto h-full snap-y snap-mandatory">
            {
                items?.map((item) => {
                    return (
                        <div className="w-full snap-start">
                            
                            <iframe 
                                src={`https://www.youtube.com/embed/${item.id.videoId}`}
//                                src={`https://www.youtube.com/embed/${item.id.videoId}?&autoplay=1&mute=1`}
                                title="YouTube video player"
                                className="w-full h-[86vh]" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen></iframe>
                        </div>
                    )
                })
            }
        </div>
    </div>
    )
}