import express from "express";
import dotenv from "dotenv";
import adminRouter from "./administrator/admin-routes.js";
import courierRouter from "./courier/courier-routes.js";
import customerRouter from "./customer/customer-routes.js";
import vendorRouter from "./vendor/vendor-routes.js";
import orderRouter from "./order/order-routes.js";
import deliveryRouter from "./delivery/delivery-routes.js";
import productRouter from "./product/product-routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "./swagger/swagger.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 4000;

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const corsOption = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors(corsOption));
app.use(express.json());
app.use("/admins", adminRouter);
app.use("/couriers", courierRouter);
app.use("/customers", customerRouter);
app.use("/vendors", vendorRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/deliveries", deliveryRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
