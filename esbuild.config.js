const path = require('path')
const {devDependencies} = require("./package.json")
module.exports =()=>{
    return{
        bundle: true,
        minify:true,
        sourcemap:true,
        platform:"node",
        keepNames: true,
        target: "node20",
        packager: "npm",
        keepOutputDirectory: true,
        exclude:[...Object.keys(devDependencies)],
        outdir: path.join(__dirname,".build")
    }
}