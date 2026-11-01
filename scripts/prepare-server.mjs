import{build}from'esbuild';await build({entryPoints:['sunder'],outfile:'server/generated-sunder.mjs',bundle:true,platform:'browser',format:'esm',target:'es2022'});
