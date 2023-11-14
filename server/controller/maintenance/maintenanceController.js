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
            return res.status(404).json({ error: "No User found" });
        }

        if (!machine || !condition || !maintenanceInterval || !status) {
            return res.status(400).json({
                error: "All required fields must be provided for creating Maintenance"
            });
        }

        const newMaintenanceData = {
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

        const newMaintenance = new Maintenance(newMaintenanceData);

        await newMaintenance.save();

        res.json({
            code: 200,
            data: {
                newMaintenanceData
            }
        });
    } catch (error) {
        console.error("Error creating Maintenance:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    createMaintenance,
}