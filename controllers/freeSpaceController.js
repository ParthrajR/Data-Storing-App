const Space = require("../models/freeSpaceModel");

const getfreeSpace = async (req, res) => {
    try {
        console.log("userrrrcccccc", req.userId)
        const existingSpace = await Space.findOne({ userId: req.userId });
        console.log("cdscscscsc", existingSpace)

        if (!existingSpace) {
            const spaceRecord = new Space({
                userId: req.userId,
            });
            await spaceRecord.save();
            res.status(200).json({ status: "success", message: 'Congratulation you have won 500 MB free storage' });
        } else {
            if (existingSpace.stage === "1") {
                const updatedSpace = {
                    stage: "2",
                    freeSpace: "800 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 300 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "2") {
                const updatedSpace = {
                    stage: "3",
                    freeSpace: "900 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 100 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "3") {
                const updatedSpace = {
                    stage: "4",
                    freeSpace: "950 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Better luck next time', updatespace });
            }
            else if (existingSpace.stage === "4") {
                const updatedSpace = {
                    stage: "5",
                    freeSpace: "1050 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 100 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "5") {
                const updatedSpace = {
                    stage: "6",
                    freeSpace: "1350 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 300 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "6") {
                const updatedSpace = {
                    stage: "7",
                    freeSpace: "1400 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 50 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "7") {
                const updatedSpace = {
                    stage: "8",
                    freeSpace: "1500 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 100 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "8") {
                const updatedSpace = {
                    stage: "9",
                    freeSpace: "1600 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 100 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "9") {
                const updatedSpace = {
                    stage: "10",
                    freeSpace: "1700 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 100 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "10") {
                const updatedSpace = {
                    stage: "11",
                    freeSpace: "1750 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 50 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "11") {
                const updatedSpace = {
                    stage: "12",
                    freeSpace: "1800 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 50 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "12") {
                const updatedSpace = {
                    stage: "13",
                    freeSpace: "1850 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 50 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "13") {
                const updatedSpace = {
                    stage: "14",
                    freeSpace: "1950 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 100 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "14") {
                const updatedSpace = {
                    stage: "15",
                    freeSpace: "2000 MB"
                }

                // Use existingSpace._id as the first parameter for findByIdAndUpdate
                const updatespace = await Space.findByIdAndUpdate(existingSpace._id, updatedSpace, { new: true });
                res.status(201).json({ message: 'Congratulation you have won 50 MB free storage', updatespace });
            }
            else if (existingSpace.stage === "15") {
                res.status(201).json({ message: 'You must have to get subscription for more space.'});
            }

        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { getfreeSpace };
