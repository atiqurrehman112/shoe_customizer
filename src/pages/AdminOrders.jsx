import React, { useEffect, useState } from "react";
import state from "../store";
import OrderAnalytics from "../components/OrderAnalytics";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.log("Fetch orders error:", error);
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      fetchOrders();
    } catch (error) {
      console.log("Delete order error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.orderStatus === "Processing"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.orderStatus === "Completed"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.price || 0),
    0
  );

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      order.phone?.includes(searchText);

    const matchesStatus =
      statusFilter === "All" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportOrdersCSV = () => {
    const csvHeader =
      "Name,Email,Phone,Size,Foot Problem,Material,Sole Type,Price,Status\n";

    const csvRows = filteredOrders.map((order) =>
      [
        order.name,
        order.email,
        order.phone,
        order.shoeSize,
        order.footProblem,
        order.material,
        order.soleType,
        order.price,
        order.orderStatus,
      ].join(",")
    );

    const csvContent = csvHeader + csvRows.join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "shoe-orders.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Processing: "bg-blue-100 text-blue-700 border-blue-200",
      Completed: "bg-green-100 text-green-700 border-green-200",
      Delivered: "bg-black text-white border-black",
    };

    return styles[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const adminLogout = () => {
    state.adminLoggedIn = false;
    state.adminPage = false;
    state.adminReviewsPage = false;
    state.currentUser = null;
    state.token = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <div
      className="fixed top-0 left-0 z-30 w-full bg-[#f4f6f8]"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 font-bold">
              Admin Panel / Orders
            </p>
            <h1 className="text-3xl font-black text-gray-900">
              Orders Dashboard
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                state.adminReviewsPage = true;
              }}
              className="bg-white border border-gray-300 text-gray-800 px-4 py-2.5 rounded-xl font-bold shadow-sm hover:bg-gray-100 transition"
            >
              Manage Reviews
            </button>

            <button
              onClick={exportOrdersCSV}
              className="bg-green-600 text-white px-4 py-2.5 rounded-xl font-bold shadow-sm hover:bg-green-700 transition"
            >
              Export CSV
            </button>

            <button
              onClick={adminLogout}
              className="bg-black text-white px-4 py-2.5 rounded-xl font-bold shadow-sm hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-bold text-sm">Total Orders</p>
            <h2 className="text-3xl font-black mt-2">{orders.length}</h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-bold text-sm">Pending</p>
            <h2 className="text-3xl font-black mt-2">{pendingOrders}</h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-bold text-sm">Processing</p>
            <h2 className="text-3xl font-black mt-2">{processingOrders}</h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-bold text-sm">Delivered</p>
            <h2 className="text-3xl font-black mt-2">{deliveredOrders}</h2>
          </div>

          <div className="bg-black text-white p-5 rounded-2xl shadow-sm">
            <p className="text-gray-300 font-bold text-sm">Revenue</p>
            <h2 className="text-2xl font-black mt-2">
              Rs. {totalRevenue.toLocaleString()}
            </h2>
          </div>
        </div>

        <OrderAnalytics orders={orders} />

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="grid lg:grid-cols-3 gap-4 items-center">
            <div className="lg:col-span-2">
              <label className="text-sm font-bold text-gray-500">
                Search Orders
              </label>
              <input
                type="text"
                placeholder="Search by customer name, email, or phone"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="mt-2 w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-500">
                Filter Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-2 w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-black"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
            >
              <div className="grid lg:grid-cols-[240px_1fr_300px] gap-6">
                <div>
                  <img
                    src={order.designImage}
                    alt="Shoe Design"
                    className="w-full h-44 object-cover rounded-2xl border bg-gray-50"
                  />

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full border text-sm font-bold ${getStatusBadge(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    {order.name}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-3 mt-4 text-gray-700">
                    <p>
                      <span className="font-bold">Email:</span> {order.email}
                    </p>
                    <p>
                      <span className="font-bold">Phone:</span> {order.phone}
                    </p>
                    <p>
                      <span className="font-bold">Size:</span>{" "}
                      {order.shoeSize}
                    </p>
                    <p>
                      <span className="font-bold">Material:</span>{" "}
                      {order.material}
                    </p>
                    <p>
                      <span className="font-bold">Sole:</span>{" "}
                      {order.soleType}
                    </p>
                    <p>
                      <span className="font-bold">Foot:</span>{" "}
                      {order.footProblem}
                    </p>
                  </div>

                  <div className="mt-4 bg-gray-50 p-4 rounded-xl">
                    <p className="font-bold text-gray-500 text-sm">
                      Delivery Address
                    </p>
                    <p className="text-gray-800">{order.address}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-gray-500 font-bold text-sm">
                    Order Amount
                  </p>
                  <h3 className="text-3xl font-black mb-5">
                    Rs. {Number(order.price || 0).toLocaleString()}
                  </h3>

                  <label className="text-sm font-bold text-gray-500">
                    Update Status
                  </label>

                  <select
                    value={order.orderStatus}
                    onChange={async (e) => {
                      const updatedStatus = e.target.value;

                      try {
                        await fetch(
                          `http://localhost:5000/api/orders/${order._id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${state.token}`,
                            },
                            body: JSON.stringify({
                              orderStatus: updatedStatus,
                            }),
                          }
                        );

                        fetchOrders();
                      } catch (error) {
                        console.log("Status update error:", error);
                      }
                    }}
                    className="mt-2 w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-black bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="mt-4 w-full bg-red-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-red-700 transition"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-gray-100">
              <h2 className="text-2xl font-black">No orders found</h2>
              <p className="text-gray-500 mt-2">
                Try changing your search or filter option.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;