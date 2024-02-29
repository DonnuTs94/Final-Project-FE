// import { TabContext } from "@mui/lab"
import { TabContext, TabPanel } from "@mui/lab"
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material"
import { useState } from "react"
import OrderUserTable from "../../components/OrderUserTable"
import { statusOrder } from "../../configs/constant/orderStatus"
import { ToastContainer } from "react-toastify"

const OrderUser = () => {
  const [tab, setTab] = useState("ALL")

  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
  }
  return (
    <>
      <Paper sx={{ height: "70vh", margin: 2, padding: 2 }}>
        <Typography variant="h3" marginBottom={2}>
          My Orders
        </Typography>
        <Box>
          <TabContext value={tab}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              indicatorColor="secondary"
              textColor="inherit"
              aria-label="secondary tabs example"
              sx={{
                fontWeight: 700
              }}
            >
              <Tab value="ALL" label="All orders" />
              <Tab value={statusOrder.WAITING_FOR_PAYMENT} label="Waiting for payment" />
              <Tab value={statusOrder.PAID} label="Paid" />
              <Tab value={statusOrder.DELIVERED} label="Delivered" />
              <Tab value={statusOrder.COMPLETED} label="Completed" />
              <Tab value={statusOrder.CANCELLED} label="Cancelled" />
            </Tabs>
            <TabPanel value="ALL">
              <OrderUserTable status={tab} />
            </TabPanel>
            <TabPanel value={statusOrder.WAITING_FOR_PAYMENT}>
              <OrderUserTable status={tab} />
            </TabPanel>
            <TabPanel value={statusOrder.PAID}>
              <OrderUserTable status={tab} />
            </TabPanel>
            <TabPanel value={statusOrder.DELIVERED}>
              <OrderUserTable status={tab} />
            </TabPanel>
            <TabPanel value={statusOrder.COMPLETED}>
              <OrderUserTable status={tab} />
            </TabPanel>
            <TabPanel value={statusOrder.CANCELLED}>
              <OrderUserTable />
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
      <ToastContainer />
    </>
  )
}

export default OrderUser
