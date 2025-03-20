"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, TrendingDown, TrendingUp } from "lucide-react"

export default function SensitiveNationGame() {
  const [economy, setEconomy] = useState(100)
  const [diplomacy, setDiplomacy] = useState(100)
  const [technology, setTechnology] = useState(100)
  const [gdp, setGdp] = useState(100)
  const [stockMarket, setStockMarket] = useState(100)
  const [inflation, setInflation] = useState(100)
  const [foreignRelations, setForeignRelations] = useState(100)
  const [tradeBalance, setTradeBalance] = useState(100)
  const [turn, setTurn] = useState(1)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audioElement = new Audio("https://www.bensound.com/bensound-music/bensound-epic.mp3")
    audioElement.loop = true
    audioElement.volume = 0.5
    setAudio(audioElement)

    return () => {
      if (audioElement) {
        audioElement.pause()
      }
    }
  }, [])

  const toggleAudio = () => {
    if (audio) {
      if (audioPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setAudioPlaying(!audioPlaying)
    }
  }

  const events = [
    {
      title: "Before 1998: Stable US-India Relations (1998년 이전: 안정적인 미국-인도 관계)",
      effect:
        "India maintains strong economic ties with the US, growing at a steady pace. (인도는 미국과 강력한 경제적 유대를 유지하며 꾸준히 성장하고 있습니다.)",
      change: {
        economy: +10,
        diplomacy: +15,
        technology: +10,
        gdp: +12,
        stockMarket: +10,
        inflation: -5,
        foreignRelations: +15,
        tradeBalance: +8,
      },
      year: "1990-1998",
      type: "positive",
    },
    {
      title: "India Conducts Nuclear Test (1998) (인도 핵실험 실시 (1998))",
      effect:
        "U.S. imposes sanctions. IMF & World Bank halt financial aid. Foreign investments drop by 20%. (미국이 제재를 가합니다. IMF와 세계은행이 금융 지원을 중단합니다. 외국인 투자가 20% 감소합니다.)",
      change: {
        economy: -25,
        diplomacy: -30,
        technology: -20,
        gdp: -15,
        stockMarket: -30,
        inflation: +12,
        foreignRelations: -25,
        tradeBalance: -18,
      },
      year: "1998",
      type: "negative",
    },
    {
      title: "Economic Struggles (1998-2001) (경제적 어려움 (1998-2001))",
      effect: "GDP growth slows from 6.5% to 4.0%. (GDP 성장률이 6.5%에서 4.0%로 둔화됩니다.)",
      change: {
        economy: -20,
        diplomacy: -10,
        technology: -15,
        gdp: -10,
        stockMarket: -15,
        inflation: +10,
        foreignRelations: -10,
        tradeBalance: -12,
      },
      year: "1998-2001",
      type: "negative",
    },
    {
      title: "Technology Embargo & Trade Restrictions (1999-2003) (기술 금수 조치 및 무역 제한 (1999-2003))",
      effect:
        "U.S. & Europe restrict India's access to critical tech. (미국과 유럽이 인도의 중요 기술 접근을 제한합니다.)",
      change: {
        economy: -15,
        diplomacy: -20,
        technology: -25,
        gdp: -8,
        stockMarket: -10,
        inflation: +5,
        foreignRelations: -15,
        tradeBalance: -10,
      },
      year: "1999-2003",
      type: "negative",
    },
    {
      title: "Russia & France Strengthen Ties (2002-2005) (러시아 & 프랑스와의 관계 강화 (2002-2005))",
      effect:
        "India diversifies partnerships, securing alternative military and energy deals. (인도는 파트너십을 다양화하여 대체 군사 및 에너지 거래를 확보합니다.)",
      change: {
        economy: +10,
        diplomacy: +8,
        technology: +12,
        gdp: +5,
        stockMarket: +10,
        inflation: -5,
        foreignRelations: +10,
        tradeBalance: +8,
      },
      year: "2002-2005",
      type: "positive",
    },
    {
      title: "U.S.-India Nuclear Agreement (2006) (미국-인도 핵 협정 (2006))",
      effect:
        "Turning Point: India's global status improves, unlocking new trade and tech opportunities. (전환점: 인도의 글로벌 지위가 향상되어 새로운 무역 및 기술 기회가 열립니다.)",
      change: {
        economy: +30,
        diplomacy: +35,
        technology: +25,
        gdp: +25,
        stockMarket: +35,
        inflation: -15,
        foreignRelations: +40,
        tradeBalance: +20,
      },
      year: "2006",
      type: "positive",
    },
  ]

  const handleEvent = (event) => {
    setEconomy((prev) => Math.max(0, Math.min(200, prev + event.change.economy)))
    setDiplomacy((prev) => Math.max(0, Math.min(200, prev + event.change.diplomacy)))
    setTechnology((prev) => Math.max(0, Math.min(200, prev + event.change.technology)))
    setGdp((prev) => Math.max(0, Math.min(200, prev + event.change.gdp)))
    setStockMarket((prev) => Math.max(0, Math.min(200, prev + event.change.stockMarket)))
    setInflation((prev) => Math.max(0, Math.min(200, prev + event.change.inflation)))
    setForeignRelations((prev) => Math.max(0, Math.min(200, prev + event.change.foreignRelations)))
    setTradeBalance((prev) => Math.max(0, Math.min(200, prev + event.change.tradeBalance)))
    setTurn((prev) => prev + 1)
  }

  const getProgressColor = (value) => {
    if (value < 40) return "bg-red-500"
    if (value < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getChangeIcon = (change) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return null
  }

  const currentEvent = turn <= events.length ? events[turn - 1] : null

  return (
    <div className="p-6 flex flex-col items-center space-y-6 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="flex justify-between w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-900">
          Historical Impact Simulation: India 
          <p>(민감국가 시뮬레이션: 인도)</p>
        </h1>
        <Button variant="outline" size="sm" onClick={toggleAudio} className="self-start">
          {audioPlaying ? "Mute Music (음악 끄기)" : "Play Music (음악 재생)"}
        </Button>
      </div>

      <div className="w-full max-w-3xl">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-800">Year (연도): {currentEvent?.year || "2006+"}</h2>
          <div className="px-4 py-1 bg-blue-100 rounded-full text-blue-800 font-medium">
            Turn (턴) {turn} of {events.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {[
            { name: "Economy (경제)", value: economy, icon: "💰" },
            { name: "Diplomacy (외교)", value: diplomacy, icon: "🤝" },
            { name: "Technology (기술)", value: technology, icon: "🔬" },
            { name: "GDP Growth (GDP 성장)", value: gdp, icon: "📈" },
            { name: "Stock Market (주식 시장)", value: stockMarket, icon: "📊" },
            { name: "Inflation (인플레이션)", value: inflation, icon: "💸" },
            { name: "Foreign Relations (외국과의 관계)", value: foreignRelations, icon: "🌐" },
            { name: "Trade Balance (무역 수지)", value: tradeBalance, icon: "⚖️" },
          ].map((stat) => (
            <Card key={stat.name} className="overflow-hidden transition-all duration-300 hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span>{stat.icon}</span>
                    {stat.name}
                  </h2>
                  <span className="font-bold text-lg">{stat.value}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(stat.value)} transition-all duration-500 ease-out`}
                    style={{ width: `${Math.min(100, stat.value / 2)}%` }}
                  />
                </div>
                {currentEvent && (
                  <div className="flex items-center mt-2 text-sm">
                    {getChangeIcon(currentEvent.change[stat.name.toLowerCase().replace(" ", "")])}
                    <span
                      className={
                        currentEvent.change[stat.name.toLowerCase().replace(" ", "")] > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {currentEvent.change[stat.name.toLowerCase().replace(" ", "")] > 0 ? "+" : ""}
                      {currentEvent.change[stat.name.toLowerCase().replace(" ", "")]}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {currentEvent ? (
        <div
          className={`p-6 border rounded-lg w-full max-w-3xl text-center transition-all duration-300 ${
            currentEvent.type === "positive" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex justify-center mb-2">
            {currentEvent.type === "positive" ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <AlertCircle className="h-8 w-8 text-red-500" />
            )}
          </div>
          <h2 className="text-xl font-bold mb-2">{currentEvent.title}</h2>
          <p className="mb-4 text-gray-700">{currentEvent.effect}</p>
          <Button
            className={`mt-2 ${currentEvent.type === "positive" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
            onClick={() => handleEvent(currentEvent)}
          >
            Proceed to Next Event (다음 이벤트로 진행)
          </Button>
        </div>
      ) : (
        <div className="p-6 border rounded-lg bg-blue-50 border-blue-200 w-full max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Simulation Complete (시뮬레이션 완료)</h2>
          <p className="mb-4">
            You've witnessed the historical impact of key events on India from 1998 to 2006. 
            <p>(1998년부터 2006년까지 인도에 대한 주요 사건들의 역사적 영향을 목격하셨습니다.)</p>
          </p>
          <Button
            onClick={() => {
              setEconomy(100)
              setDiplomacy(100)
              setTechnology(100)
              setGdp(100)
              setStockMarket(100)
              setInflation(100)
              setForeignRelations(100)
              setTradeBalance(100)
              setTurn(1)
            }}
          >
            Restart Simulation (시뮬레이션 재시작)
          </Button>
        </div>
      )}
      <footer className="mt-8 text-center text-gray-600 text-sm">
      copyright 2025 OpenPEN. [https://4rest-maker.tistory.com]
      </footer> 
    </div>
  )
}

