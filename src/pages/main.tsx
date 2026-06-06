import { useEffect, useRef, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import {
  SearchOutlined,
  FilterOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Tour } from "antd";

type Request = {
  id: number;
  fullName: string;
  nationalCode: string;
  mobile: string;
  amount: number;
  createdAt: string;
  status: number;
};

const initialData: Request[] = [
  {
    id: 1001,
    fullName: "علی محمدی",
    nationalCode: "0012547896",
    mobile: "09121234567",
    amount: 850000000,
    createdAt: "1405/03/15",
    status: 1,
  },
  {
    id: 1002,
    fullName: "رضا احمدی",
    nationalCode: "0045789652",
    mobile: "09123334455",
    amount: 450000000,
    createdAt: "1405/03/18",
    status: 1,
  },
  {
    id: 1003,
    fullName: "محمد حسینی",
    nationalCode: "0089654785",
    mobile: "09125557788",
    amount: 1200000000,
    createdAt: "1405/03/20",
    status: 2,
  },
  {
    id: 1004,
    fullName: "سارا اکبری",
    nationalCode: "0036985214",
    mobile: "09127778899",
    amount: 300000000,
    createdAt: "1405/03/10",
    status: 3,
  },
  {
    id: 1005,
    fullName: "امیر رضایی",
    nationalCode: "0098745632",
    mobile: "09124445566",
    amount: 950000000,
    createdAt: "1405/03/05",
    status: 4,
  },
];

const columns = [
  { id: "1", title: "بررسی اولیه", color: "bg-sky-500" },
  { id: "2", title: "تکمیل مستندات", color: "bg-amber-500" },
  { id: "3", title: "کمیته تسهیلات", color: "bg-violet-500" },
  { id: "4", title: "در انتظار پرداخت", color: "bg-emerald-500" },
];

const getCardStatusLabel = (status: number) => {
  switch (status) {
    case 1:
      return "بررسی اولیه";
    case 2:
      return "تکمیل مستندات";
    case 3:
      return "کمیته تسهیلات";
    case 4:
      return "در انتظار پرداخت";
    default:
      return "نامشخص";
  }
};

export default function RequestBoard() {
  const [requests, setRequests] = useState<Request[]>(initialData);
  const [searches, setSearches] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [openTour, setOpenTour] = useState(false);

  const firstCardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOpenTour(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const requestId = Number(result.draggableId);
    const newStatus = Number(result.destination.droppableId);

    setRequests((prev) =>
      prev.map((item) =>
        item.id === requestId
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  return (
    <>
      <Tour
        open={openTour}
        onClose={() => {
          setOpenTour(false);
          localStorage.setItem("request-board-tour", "true");
        }}
        steps={[
          {
            title: "جابجایی درخواست‌ها",
            description:
              "برای تغییر وضعیت درخواست کافی است کارت را گرفته و به ستون مورد نظر منتقل کنید.",
            nextButtonProps: {
              children: "متوجه شدم",
            },
            target: () => firstCardRef.current!,
          },
        ]}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">

          {columns.map((column) => {
            const items = requests.filter((item) => {
              if (item.status !== Number(column.id)) return false;

              const search =
                searches[column.id]?.toLowerCase() || "";

              const filter = filters[column.id];

              const matchSearch =
                item.fullName.toLowerCase().includes(search) ||
                item.mobile.includes(search) ||
                item.nationalCode.includes(search);

              const matchFilter =
                !filter ||
                (filter === "low" && item.amount < 500000000) ||
                (filter === "medium" &&
                  item.amount >= 500000000 &&
                  item.amount < 1000000000) ||
                (filter === "high" &&
                  item.amount >= 1000000000);

              return matchSearch && matchFilter;
            });

            return (
              <div
                key={column.id}
                className="
                  bg-white
                  rounded-[28px]
                  border
                  border-slate-200
                  shadow-sm
                  overflow-hidden
                  h-212.5
                  flex
                  flex-col
                "
              >
                <div className="sticky top-0 z-20 bg-white">
                  <div className="p-5">

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${column.color}`}
                        />

                        <div>
                          <h3 className="font-bold text-slate-800">
                            {column.title}
                          </h3>

                          <p className="text-xs text-slate-400 mt-1">
                            {items.length} درخواست
                          </p>
                        </div>
                      </div>

                      <button className="w-9 h-9 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center">
                        <MoreOutlined />
                      </button>
                    </div>

                    <div className="mt-5">
                      <div className="h-11 rounded-2xl bg-slate-100 px-3 flex items-center gap-2">
                        <SearchOutlined className="text-slate-400" />

                        <input
                          value={searches[column.id] || ""}
                          onChange={(e) =>
                            setSearches((prev) => ({
                              ...prev,
                              [column.id]: e.target.value,
                            }))
                          }
                          placeholder="جستجو..."
                          className="flex-1 bg-transparent outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-3 relative">
                      <FilterOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />

                      <select
                        value={filters[column.id] || ""}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            [column.id]: e.target.value,
                          }))
                        }
                        className="w-full h-11 rounded-2xl border border-slate-200 pr-10 px-3 text-sm outline-none"
                      >
                        <option value="">همه مبالغ</option>
                        <option value="low">کمتر از ۵۰۰ میلیون</option>
                        <option value="medium">
                          ۵۰۰ میلیون تا ۱ میلیارد
                        </option>
                        <option value="high">
                          بیشتر از ۱ میلیارد
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />
                </div>

                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex-1 p-4 bg-slate-50 overflow-y-auto"
                    >
                      {items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={String(item.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={(el) => {
                                provided.innerRef(el);
                                if (
                                  column.id === "1" &&
                                  index === 0
                                ) {
                                  firstCardRef.current = el;
                                }
                              }}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`
                                bg-white
                                border
                                border-slate-200
                                rounded-3xl
                                p-4
                                mb-4
                                transition-all
                                duration-300
                                cursor-pointer
                                group
                                ${
                                  snapshot.isDragging
                                    ? "shadow-2xl scale-[1.02] rotate-1"
                                    : "hover:shadow-lg hover:-translate-y-1"
                                }
                              `}
                            >

                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-xs text-slate-400">
                                    درخواست #{item.id}
                                  </span>

                                  <h3 className="font-bold mt-1 text-slate-800">
                                    {item.fullName}
                                  </h3>

                                  <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                                    <span
                                      className={`
                                        w-2 h-2 rounded-full
                                        ${
                                          item.status === 1
                                            ? "bg-sky-500"
                                            : item.status === 2
                                            ? "bg-amber-500"
                                            : item.status === 3
                                            ? "bg-violet-500"
                                            : "bg-emerald-500"
                                        }
                                      `}
                                    />

                                    <span className="text-[11px] font-medium text-slate-600">
                                      {getCardStatusLabel(item.status)}
                                    </span>
                                  </div>
                                </div>

                                <input
                                  type="checkbox"
                                  className="w-4 h-4 mt-1"
                                />
                              </div>

                              <div className="flex items-center gap-3 mt-4">
                                <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center font-bold">
                                  {item.fullName[0]}
                                </div>

                                <div>
                                  <div className="text-sm font-medium">
                                    {item.mobile}
                                  </div>
                                  <div className="text-xs text-slate-400">
                                    {item.nationalCode}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-4">
                                <div className="text-xs text-slate-400">
                                  مبلغ تسهیلات
                                </div>
                                <div className="text-xl font-black mt-2">
                                  {item.amount.toLocaleString()}
                                </div>
                                <div className="text-xs text-slate-400">
                                  تومان
                                </div>
                              </div>

<div className="mt-4 pt-4 border-t flex justify-between items-center">
  <span className="text-xs text-slate-400">
    {item.createdAt}
  </span>

  <div className="flex items-center gap-2 transition-all">

    <button
      className="
        px-2.5 py-1.5
        rounded-xl
        bg-red-50
        text-red-600
        text-xs
        hover:bg-red-100
        transition
        flex items-center gap-1
      "
    >
      حذف
    </button>

    <button className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 text-xs">
      مشاهده
    </button>

  </div>
</div>

                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
}