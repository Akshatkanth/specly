const si = require('systeminformation');
const osu = require('node-os-utils');
const { sendSpecs } = require('./utils/sendData');

const scanSpecs = async () => {
    try {
        const cpu = await si.cpu();
        const gpu = await si.graphics();
        const mem = await si.mem();
        const disk = await si.diskLayout();
        const osInfo = await osu.os.oos();

        const specs = {
            cpu: {
                model: cpu.brand,
                cores: cpu.cores,
                threads: cpu.processors || cpu.cores * 2,
                speed: cpu.speed
            },
            gpu: gpu.controllers[0]
                ? { model: gpu.controllers[0].model, vram: gpu.controllers[0].vram }
                : { model: "Integrated", vram: 0 },
            ram: { size: Math.floor(mem.total / (1024*1024*1024)) },
            storage: disk.map(d => ({ type: d.type, size: Math.floor(d.size / (1024*1024*1024)) })),
            os: osInfo,
            deviceType: osInfo.toLowerCase().includes("laptop") ? "laptop" : "desktop"
        };

        console.log("Specs collected:", specs);

        await sendSpecs(specs);

    } catch(err) {
        console.error("Error scanning specs:", err);
    }
};

module.exports = { scanSpecs };
