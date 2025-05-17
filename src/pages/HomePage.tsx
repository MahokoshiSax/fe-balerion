import MemoCard from "@/components/memo-card";
import MemoCardForm from "@/components/memo-card-form";
import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";

export interface MemoCardDataType {
  title: string
  role: string
  description: string
}

export default function HomePage() {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [adminCardCount, setAdminCardCount] = useState<number>(1)
  const [userCardCount, setUserCardCount] = useState<number>(0)
  const [memoCardData, setMemoCardData] = useState<MemoCardDataType[]>([{
    title: "admin-1",
    role: "admin",
    description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable."
  }])
  const role = (localStorage.getItem("role") as string).toLocaleLowerCase()
  const nextNumber = role === "admin" ? adminCardCount+1 : userCardCount+1

  const handleSaveCreateMemo = (value: MemoCardDataType) => {
    setMemoCardData(prev => [...prev, value])
    if (role === "admin") {
      setAdminCardCount(prev => prev+1)
    } else {
      setUserCardCount(prev => prev+1)
    }
    setIsCreating(false)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 text-center gap-6">
        <div className="p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-8">{`Memo Card (${adminCardCount + userCardCount})`}</h1>
          <div className="grid max-[425px]:grid-cols-1 grid-cols-3 gap-4 text-black justify-self-center">
            {memoCardData.map((memoCard) => (
              <MemoCard key={memoCard.title} title={memoCard.title} userLabel={role} content={memoCard.description} />
            ))}
            {isCreating ? (
              <MemoCardForm title={`${role}-${nextNumber}`} userLabel={role} onSave={handleSaveCreateMemo} />
            ) : (
              <div onClick={() => setIsCreating(true)} className="bg-white p-4 rounded-lg shadow-md  w-[347px] h-[198px] flex items-center justify-center">
                <PlusIcon size={50} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 