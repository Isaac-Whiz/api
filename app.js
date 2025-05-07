import express from "express";
import adminRouter from "./administrator/admin-routes.js";
import courierRouter from "./courier/courier-routes.js";
import customerRouter from "./customer/customer-routes.js";
import vendorRouter from "./vendor/vendor-routes.js";
import orderRouter from "./order/order-routes.js";
import deliveryRouter from "./delivery/delivery-routes.js";

const app = express();

app.use(express.json());
app.use("/admins", adminRouter);
app.use("/couriers", courierRouter);
app.use("/customers", customerRouter);
app.use("/vendors", vendorRouter);
app.use("/orders", orderRouter);
app.use("/deliveries", deliveryRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
