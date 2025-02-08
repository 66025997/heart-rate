"use client";

import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function HeartRateCalculator() {
  const [age, setAge] = useState(25);
  const [error, setError] = useState("");
  const maxHeartRate = 220 - age;
  const zones = [
    { name: "Zone 1", range: [50, 60], color: "bg-green-400", description: "เหมาะสำหรับการพัฒนาสุขภาพโดยรวมและช่วยให้หัวใจแข็งแรง" },
    { name: "Zone 2", range: [60, 70], color: "bg-blue-400", description: "เหมาะสำหรับการเผาผลาญไขมันและการออกกำลังกายแบบเบา" },
    { name: "Zone 3", range: [70, 80], color: "bg-yellow-400", description: "ช่วยพัฒนาความทนทานของหัวใจและระบบไหลเวียนโลหิต" },
    { name: "Zone 4", range: [80, 90], color: "bg-orange-400", description: "เหมาะสำหรับนักกีฬาหรือผู้ที่ต้องการฝึกฝนความสามารถสูงสุด" },
    { name: "Zone 5", range: [90, 100], color: "bg-red-400", description: "เป็นระดับสูงสุดสำหรับการฝึกฝนหนักและการพัฒนาความสามารถสูงสุดของหัวใจ" }
  ];

  const handleAgeChange = (value: SetStateAction<number>) => {
    const newValue = typeof value === "number" ? value : age;
    if (newValue < 10 || newValue > 100) {
      setError("กรุณากรอกอายุระหว่าง 10 - 100 ปี");
    } else {
      setError("");
      setAge(value);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center drop-shadow-md">คำนวณอัตราการเต้นของหัวใจ</h1>
      <p className="text-center mt-2">ใช้สูตร 220 - อายุ เพื่อคำนวณอัตราการเต้นของหัวใจสูงสุด</p>

      <div className="mt-6 flex flex-col items-center">
        <div className="flex items-center space-x-2">
          <Button onClick={() => handleAgeChange(Math.max(10, age - 1))}>-</Button>
          <input
            type="number"
            value={age}
            onChange={(e) => handleAgeChange(parseInt(e.target.value) || 10)}
            className="border p-2 w-20 text-center text-xl rounded-md"
          />
          <Button onClick={() => handleAgeChange(Math.min(100, age + 1))}>+</Button>
        </div>
        <div className="mt-4 flex justify-center w-full">
          <Slider value={[age]} onValueChange={(v) => handleAgeChange(v[0])} />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <p className="mt-4 text-2xl text-center font-semibold">❤️ อัตราการเต้นของหัวใจสูงสุดของคุณคือ: <b>{maxHeartRate}</b> bpm</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        {zones.map((zone) => (
          <div key={zone.name} className={`${zone.color} p-6 shadow-lg rounded-xl text-white`}>
            <Card>
              <CardContent>
                <h2 className="text-xl font-bold">{zone.name}</h2>
                <p className="text-lg">{zone.range[0]}% - {zone.range[1]}% ({Math.round(maxHeartRate * zone.range[0] / 100)} - {Math.round(maxHeartRate * zone.range[1] / 100)} bpm)</p>
                <p className="mt-2">{zone.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
