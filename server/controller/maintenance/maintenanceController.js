const User = require("../../model/userModel");
const Maintenance = require("../../model/maintenanceModel")


const createMaintenance = async (req, res) => {
    console.log(req.userId);
    console.log(req.email);

    const {
        machine,
        condition,
        location,
        assignedTo,
        lastMaintenanceDate,
        maintenanceInterval,
        nextMaintenanceDate,
        notes,
        status
    } = req.body;

    try {
        const existingUser = await User.findOne({
            _id: req.userId
        });

        if (!existingUser) {
            return res.status(404).json({ message: "No User found" });
        }

        if (!machine || !condition || !maintenanceInterval || !status) {
            return res.status(400).json({
                message: "All required fields must be provided for creating Maintenance"
            });
        }

        const data = {
            machine: machine,
            condition: condition,
            location: location,
            assignedTo: assignedTo,
            lastMaintenanceDate: lastMaintenanceDate,
            maintenanceInterval: maintenanceInterval,
            nextMaintenanceDate: nextMaintenanceDate,
            notes: notes,
            status: status,
        };

        const newMaintenance = new Maintenance(data);

        await newMaintenance.save();

        res.status(200).json({
            
            data,
            message:"Maintenance data created successfully."

        });
    } catch (error) {
        console.error("Error creating Maintenance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllMaintenance = async (req, res) => {
    console.log(req.userId);
    console.log(req.email);

    try {
        // Assuming you have a user model
        const existingUser = await User.findOne({
            _id: req.userId,
        });

        if (!existingUser) {
            return res.status(404).json({ error: "No User found!" });
        }

        const allMaintenance = await Maintenance.find().sort({ date: -1 });

        if (!allMaintenance) {
            return res.status(400).json({
                error: "No Maintenance records found!",
            });
        }

        const formattedMaintenance = allMaintenance.map((data) => ({
            id: data._id,
            machine: data.machine,
            condition: data.condition,
            location: data.location,
            assignedTo: data.assignedTo,
            lastMaintenanceDate: data.lastMaintenanceDate,
            maintenanceInterval: data.maintenanceInterval,
            nextMaintenanceDate: data.nextMaintenanceDate,
            notes: data.notes,
            status: data.status,
        }));

        res.json({
            code: 200,
            data: {
                userId: req.userId,
                data: formattedMaintenance,
            },
        });
    } catch (error) {
        console.error("Error fetching maintenance list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const deleteMaintenance = async (req, res) => {
    try {
        // Get the maintenance ID from the request parameters
        const { maintenanceId } = req.body;

        // Find the maintenance by its ID and remove it
        const deletedMaintenance = await Maintenance.findByIdAndRemove(maintenanceId);

        if (!deletedMaintenance) {
            return res.status(404).json({ error: "Maintenance not found" });
        }

        // If the maintenance was successfully deleted, return a success response
        res.status(200).json({
            code: 200,
            message: "Maintenance deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting maintenance:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateMaintenance = async (req, res) => {
    try {
        // Get maintenance ID and status from the request body
        const { id, status } = req.body;

        // Find maintenance by ID
        const existingMaintenance = await Maintenance.findById(id);

        
        if (!existingMaintenance) {
            return res.status(404).json({ error: "Maintenance not found" });
        }

        if(status === "in progress"){
            existingMaintenance.status = "in progress"
            const updatedMaintenance = await existingMaintenance.save();

           return res.status(200).json({message:"status updated to in progress",
                                        data:updateMaintenance
        })
           
        }


        // Update the status
        existingMaintenance.status = status;

        // If the status is "complete," update lastMaintenanceDate and calculate nextMaintenanceDate
        if (status === "complete") {
            existingMaintenance.lastMaintenanceDate = new Date();

            // Calculate nextMaintenanceDate by adding maintenanceInterval to the current date
            const currentDate = new Date();
            const maintenanceInterval = existingMaintenance.maintenanceInterval;
            const nextMaintenanceDate = new Date(currentDate.getTime() + maintenanceInterval * 24 * 60 * 60 * 1000);
            
            existingMaintenance.nextMaintenanceDate = nextMaintenanceDate;
        }

        // Save the updated maintenance
        const updatedMaintenance = await existingMaintenance.save();

        // Send the updated maintenance data as a response
        res.status(200).json({
            code: 200,
            data: {
                updatedMaintenance
            },
        });
    } catch (error) {
        console.error("Error updating maintenance:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createMaintenance,
    getAllMaintenance,
    deleteMaintenance,
    updateMaintenance
}