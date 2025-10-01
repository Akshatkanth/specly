
const analyzeSpecs = (req, res) => {
    const specs = req.body;

    
    const bottlenecks = [];
    const outdatedParts = [];
    const suggestions = [];

    if(specs.ram.size < 16){
        bottlenecks.push("RAM");
        suggestions.push("Upgrade RAM to at least 16GB");
    }

    if(specs.gpu.model.toLowerCase().includes("integrated")){
        bottlenecks.push("GPU");
        outdatedParts.push("GPU");
        suggestions.push("Upgrade GPU to a dedicated card");
    }

    res.json({
        bottlenecks,
        outdatedParts,
        upgradeSuggestions: suggestions
    });
};

module.exports = { analyzeSpecs };
