const Vendor = require("../../model/vendorModel");
const Service = require("../../model/serviceModel");
const User = require("../../model/userModel");
const Invoice = require("../../model/invoiceModel")

const createService = async (req, res) => {
    console.log(req.userId);
    console.log(req.email);

    const { service, accountNumber, cost, dueDate } = req.body;

    try {
        const existingUser = await User.findOne({
            _id: req.userId
        });

        if (!existingUser) {
            return res.status(404).json({ error: "No User found" });
        }

        if (!service || !accountNumber || !cost || !dueDate) {
            return res.status(400).json({
                error: "All required fields must be provided for creating Service"
            });
        }

        const newServiceData = {
            service: service,
            accountNumber: accountNumber,
            cost: cost,
            dueDate: dueDate
        };

        const newService = new Service(newServiceData);

        await newService.save();

        res.json({
            code: 200,
            data: {
                userId: req.userId,
                newServiceData: {
                    ServiceId: newService._id,
                    service: newService.service,
                    accountNumber: newService.accountNumber,
                    cost: newService.cost,
                    dueDate: newService.dueDate
                }
            }
        });
    } catch (error) {
        console.error("Error creating Service:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const getAllServicedata = async (req, res) => {
    console.log(req.userId);
    console.log(req.email);

    try {
        const existingUser = await User.findOne({
            _id: req.userId
        });

        if (!existingUser) {
            return res.status(404).json({ error: "No User found!" });
        }

        const existingServices = await Service.find();

        if (!existingServices){
            return res.status(400).json({
                error:"No Service data found"
            })
        }

        const formattedService = existingServices.map((data) => ({
            ServiceId: data._id,
            service: data.service,
            accountNumber: data.accountNumber,
            cost: data.cost,
            dueDate: data.dueDate
          }));

        res.json({
            code: 200,
            data: {
                userId: req.userId,
                services: formattedService
            }
        });
    } catch (error) {
        console.error("Error getting services:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}





const updateService = async (req, res) => {
    const {
        serviceId,
        service,
        accountNumber,
        cost,
        dueDate
    } = req.body;

    try {
        const existingService = await Service.findOne({
            _id: serviceId,
        });

        if (!existingService) {
            return res.status(404).json({ error: "No service data found" });
        }

        if (service != null && service !== "") {
            existingService.service = service;
        }
        if (accountNumber != null && accountNumber !== "") {
            existingService.accountNumber = accountNumber;
        }
        if (cost != null && cost !== "") {
            existingService.cost = cost;
        }
        if (dueDate != null && dueDate !== "") {
            existingService.dueDate = dueDate;
        }

        const updatedService = await existingService.save();

        return res.status(200).json({
            code: 200,
            data: {
                userId: req.userId,
                updatedServiceData: {
                    serviceId: updatedService._id,
                    service: updatedService.service,
                    accountNumber: updatedService.accountNumber,
                    cost: updatedService.cost,
                    dueDate: updatedService.dueDate,
                },
            },
        });

    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



const fetchServiceCost = async (req, res) => {
    try {
        // Fetch data for services
        const allServices = await Service.find();

        // Get the time interval from req.body
        const { timeInterval } = req.body;

        // Declare required variables.
        const now = new Date();
        const totalCost = {};

        // Define the end date based on the provided time interval
        let intervalEndDate = new Date();

        if (timeInterval === '1 week') {
            intervalEndDate.setDate(now.getDate() - 7);
        } else if (timeInterval === '2 weeks') {
            intervalEndDate.setDate(now.getDate() - 14);
        } else if (timeInterval === '1 month') {
            intervalEndDate.setMonth(now.getMonth() - 1);
        } else if (timeInterval === '3 months') {
            intervalEndDate.setMonth(now.getMonth() - 3);
        } else if (timeInterval === '6 months') {
            intervalEndDate.setMonth(now.getMonth() - 6);
        } else if (timeInterval === '1 year') {
            intervalEndDate.setFullYear(now.getFullYear() - 1);
        }

        // Filter services that fall within the time interval
        const filteredServices = allServices.filter(service => service.dueDate >= intervalEndDate && service.dueDate <= now);

        // Calculate the total cost for each service name
        filteredServices.forEach(service => {
            if (totalCost[service.service]) {
                totalCost[service.service] += service.cost;
            } else {
                totalCost[service.service] = service.cost;
            }
        });

        res.status(200).json({
            code: 200,
            data: totalCost,
        });
    } catch (error) {
        console.error("Error fetching and calculating service data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteService = async (req, res) => {
    try {
        // Get the service ID from the request parameters
        const {serviceId} = req.body;
        console.log(serviceId)

        // Find the service by its ID and remove it
        const deletedService = await Service.findByIdAndRemove(serviceId);

        if (!deletedService) {
            return res.status(404).json({ error: "Service not found" });
        }

        // If the service was successfully deleted, return a success response
        res.status(200).json({
            code: 200,
            message: "Service deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const filterInvoice = async (req, res) => {
    try {
        const currentDate = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

        const depositAndDueByMonth = []; // Array to store results

        const allInvoice = await Invoice.find();

        const filteredInvoice = allInvoice.filter((invoice) =>
            invoice.updatedAt >= oneYearAgo && invoice.updatedAt <= currentDate
        );

        // Create a mapping from month number to abbreviated month name
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        // Initialize a dictionary to store totals by month
        const totalsByMonth = {};

        filteredInvoice.forEach((invoice) => {
            const updatedAt = invoice.updatedAt;
            const month = updatedAt.getMonth();
            const year = updatedAt.getFullYear();
            const key = `${monthNames[month]} ${year}`;

            if (!totalsByMonth[key]) {
                totalsByMonth[key] = {
                    depositedAmount: 0,
                    dueAmount: 0
                };
            }

            totalsByMonth[key].depositedAmount += parseFloat(invoice.depositAmount);
            totalsByMonth[key].dueAmount += (parseFloat(invoice.totalAmount) - parseFloat(invoice.depositAmount));
        });

        // Convert the dictionary to the desired array format
        for (const key in totalsByMonth) {
            const entry = {
                date: key,
                depositedAmount: totalsByMonth[key].depositedAmount,
                dueAmount: totalsByMonth[key].dueAmount
            };
            depositAndDueByMonth.push(entry);
        }

        res.status(200).json({
            code: 200,
            data: depositAndDueByMonth
        });
    } catch (error) {
        console.error("Error fetching invoice data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    createService,
    getAllServicedata,
    updateService,
    fetchServiceCost,
    deleteService,
    filterInvoice
  };