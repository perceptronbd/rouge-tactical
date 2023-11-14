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

module.exports = {
    createMaintenance,
    getAllMaintenance,
    deleteMaintenance
}