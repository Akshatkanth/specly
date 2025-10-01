const checkCompatibility = (req, res) => {
    const { softwareName, userSpecs } = req.body;

    
    let canRun = true;
    let recommendations = [];

    if(userSpecs.ram < 16){
        canRun = false;
        recommendations.push("Upgrade RAM to 16GB");
    }

    res.json({
        canRun,
        performanceLevel: canRun ? "Recommended settings" : "Low settings",
        recommendations
    });
};

module.exports = { checkCompatibility };
