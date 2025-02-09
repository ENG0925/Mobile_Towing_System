import { Card } from "@/components/ui/card";
import {
  Car,
  Users,
  CalendarCheck,
  Star,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const getVehicleStatus = () => [
  { status: "Available", count: 15, color: "bg-green-500" },
  { status: "In Use", count: 6, color: "bg-blue-500" },
  { status: "Maintenance", count: 3, color: "bg-yellow-500" },
];

const getRecentBookings = () => [
  {
    id: 1,
    vehicle: "Toyota Camry",
    customerName: "John Doe",
    status: "Cancel",
  },
  {
    id: 2,
    vehicle: "Honda Civic",
    customerName: "Jane Smith",
    status: "Completed",
  },
  {
    id: 3,
    vehicle: "Tesla Model 3",
    customerName: "Mike Johnson",
    status: "Pending",
  },
];

const getMaintenanceAlerts = () => [
  {
    vehicle: "Toyota Camry (ABC123)",
    alert: "Service due in 3 days",
    priority: "High",
  },
  {
    vehicle: "Honda Civic (XYZ789)",
    alert: "Tire replacement needed",
    priority: "Medium",
  },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6 w-full">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Vehicles</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CalendarCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Confirm Bookings</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Drivers</p>
              <h3 className="text-2xl font-bold">18</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Rating</p>
              <h3 className="text-2xl font-bold">4.8</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activities and Vehicle Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Vehicle Status */}
        <Card className="p-6 w-full">
          <h2 className="text-xl font-semibold mb-4">Vehicle Status</h2>
          <div className="space-y-4">
            {getVehicleStatus().map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span>{item.status}</span>
                </div>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Bookings */}
        <Card className="p-6 w-full">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {getRecentBookings().map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between border-b pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium">{booking.vehicle}</p>
                  <p className="text-sm text-gray-500">
                    Customer Name: {booking.customerName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{booking.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Vehicle Information Section */}
      <Card className="p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-700 mb-2">Safety Features</h3>
            <ul className="space-y-2 text-sm text-blue-600">
              <li>• Anti-lock Braking System</li>
              <li>• Electronic Stability Control</li>
              <li>• Advanced Airbag System</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-700 mb-2">
              Comfort Features
            </h3>
            <ul className="space-y-2 text-sm text-green-600">
              <li>• Climate Control</li>
              <li>• Power Steering</li>
              <li>• Adjustable Seats</li>
            </ul>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-purple-700 mb-2">Technology</h3>
            <ul className="space-y-2 text-sm text-purple-600">
              <li>• GPS Navigation</li>
              <li>• Bluetooth Connectivity</li>
              <li>• Parking Sensors</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
