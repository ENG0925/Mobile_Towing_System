'use client';
import { Card } from "@/components/ui/card";
import { getDashboardInfo } from "@/lib/api/system_admin";
import { Car, Users, CalendarCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [totalVehicle, setTotalVehicle] = useState(0);
  const [confirmBookings, setConfirmBookings] = useState(0);
  const [activeDrivers, setActiveDrivers] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [recentFeedback, setRecentFeedback] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      const response = await getDashboardInfo();
      setTotalVehicle(response.data.totalVehicle);
      setConfirmBookings(response.data.confirmBookings);
      setActiveDrivers(response.data.activeDrivers);
      setAvgRating(response.data.avgRating); // Show 2 decimal places
      setRecentFeedback(response.data.recentFeedback);
      setRecentBookings(response.data.recentBookings);
    };

    fetchDashboardInfo();
  }, []);

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
              <h3 className="text-2xl font-bold">{totalVehicle}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CalendarCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Complete Bookings</p>
              <h3 className="text-2xl font-bold">{confirmBookings}</h3>
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
              <h3 className="text-2xl font-bold">{activeDrivers}</h3>
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
              <h3 className="text-2xl font-bold">{avgRating}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card className="p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>
        <div className="space-y-4">
          {recentFeedback.length > 0 ? (
            recentFeedback.map((feedback) => (
              <div key={feedback.id} className="border-b pb-3 last:border-0">
                <p className="font-medium">{feedback.name}</p>
                <p className="text-gray-500">{feedback.comment}</p>
                <p className="text-yellow-600 font-semibold">
                  ⭐ {feedback.rating} ({feedback.numLike} Likes)
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No feedback available</p>
          )}
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card className="p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <div className="space-y-4">
          {recentBookings.length > 0 ? (
            recentBookings.map((booking, index) => (
              <div key={index} className="flex justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium">{booking.vehicle}</p>
                  <p className="text-sm text-gray-500">
                    Customer: {booking.customerName}
                  </p>
                </div>
                <p className="text-sm font-medium">{booking.status}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent bookings</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
