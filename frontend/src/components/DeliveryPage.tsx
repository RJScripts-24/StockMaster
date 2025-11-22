import { useState } from "react";
import { Search, Menu, LayoutGrid } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Navigation } from "./Navigation";
import { NewDeliveryForm } from "./NewDeliveryForm";

interface DeliveryPageProps {
  onNavigate: (page: string) => void;
}

export function DeliveryPage({ onNavigate }: DeliveryPageProps) {
  const [showNewDeliveryForm, setShowNewDeliveryForm] = useState(false);
  const [deliveries, setDeliveries] = useState([
    { 
      reference: "WH/OUT/0001", 
      from: "WH/Stock1", 
      to: "vendor", 
      contact: "Azure Interior", 
      scheduleDate: "12/5/2024", 
      status: "Ready" 
    },
    { 
      reference: "WH/OUT/0002", 
      from: "WH/Stock1", 
      to: "vendor", 
      contact: "Azure Interior", 
      scheduleDate: "12/6/2024", 
      status: "Ready" 
    },
    { 
      reference: "WH/OUT/0003", 
      from: "WH/Stock2", 
      to: "vendor", 
      contact: "Tech Supplies Co", 
      scheduleDate: "12/7/2024", 
      status: "In Progress" 
    },
    { 
      reference: "WH/OUT/0004", 
      from: "WH/Stock1", 
      to: "vendor", 
      contact: "Office Depot", 
      scheduleDate: "12/4/2024", 
      status: "Completed" 
    },
    { 
      reference: "WH/OUT/0005", 
      from: "WH/Stock2", 
      to: "vendor", 
      contact: "Global Traders", 
      scheduleDate: "12/8/2024", 
      status: "Waiting" 
    },
  ]);

  const handleSaveDelivery = (data: any) => {
    const newDelivery = {
      reference: `WH/OUT/${String(deliveries.length + 1).padStart(4, '0')}`,
      from: data.from || "WH/Stock1",
      to: data.to || "vendor",
      contact: data.contact,
      scheduleDate: data.scheduleDate,
      status: "Draft"
    };
    setDeliveries([...deliveries, newDelivery]);
    setShowNewDeliveryForm(false);
  };

  if (showNewDeliveryForm) {
    return (
      <NewDeliveryForm 
        onNavigate={onNavigate}
        onSave={handleSaveDelivery}
        onCancel={() => setShowNewDeliveryForm(false)}
      />
    );
  }

  const totalDeliveries = deliveries.length;
  const readyCount = deliveries.filter(d => d.status === "Ready").length;
  const inProgressCount = deliveries.filter(d => d.status === "In Progress").length;
  const completedCount = deliveries.filter(d => d.status === "Completed").length;

  return (
    <div className="min-h-screen bg-[#2c4b52] flex flex-col">
      <Navigation activeMenu="operations" onNavigate={onNavigate} />

      <div className="flex-1 px-6 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setShowNewDeliveryForm(true)}
              className="bg-transparent border-2 border-[#00d9a3] text-[#00d9a3] hover:bg-[#00d9a3] hover:text-[#1e3338] h-11 px-4 rounded-[10px] font-['Arimo',sans-serif] flex items-center gap-2"
            >
              + NEW
            </Button>
            <h2 className="font-['Arimo',sans-serif] text-white text-3xl">Delivery</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b8690]" />
              <Input
                type="text"
                placeholder="Search deliveries..."
                className="pl-10 bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-10 rounded-lg font-['Arimo',sans-serif] w-64"
              />
            </div>
            <button className="bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] rounded-lg size-10 flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </button>
            <button className="bg-[#2c4b52] hover:bg-[#3a5a62] border border-[#3a5a62] text-white rounded-lg size-10 flex items-center justify-center">
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3a5a62]">
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Reference</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">From</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">To</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Contact</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Schedule date</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery, index) => (
                <tr
                  key={index}
                  className="border-b border-[#3a5a62] hover:bg-[#2c4b52] transition-colors cursor-pointer"
                  onClick={() => setShowNewDeliveryForm(true)}
                >
                  <td className="p-4">
                    <span className="font-['Arimo',sans-serif] text-base text-[#ff6b6b]">
                      {delivery.reference}
                    </span>
                  </td>
                  <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{delivery.from}</td>
                  <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{delivery.to}</td>
                  <td className="p-4 font-['Arimo',sans-serif] text-[#00d9a3] text-base">{delivery.contact}</td>
                  <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{delivery.scheduleDate}</td>
                  <td className="p-4">
                    <span
                      className={`font-['Arimo',sans-serif] text-base ${
                        delivery.status === "Ready"
                          ? "text-[#ff6b6b]"
                          : delivery.status === "Completed"
                          ? "text-[#00d9a3]"
                          : delivery.status === "Waiting"
                          ? "text-[orange]"
                          : "text-orange-500"
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">Total Deliveries</p>
            <p className="font-['Arimo',sans-serif] text-white text-4xl">{totalDeliveries}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">Ready</p>
            <p className="font-['Arimo',sans-serif] text-[#ff6b6b] text-4xl">{readyCount}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">In Progress</p>
            <p className="font-['Arimo',sans-serif] text-orange-500 text-4xl">{inProgressCount}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">Completed</p>
            <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-4xl">{completedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
