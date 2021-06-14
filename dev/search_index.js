var documenterSearchIndex = {"docs":
[{"location":"man/datastructures/#Data-structures","page":"Data Structures","title":"Data structures","text":"","category":"section"},{"location":"man/datastructures/","page":"Data Structures","title":"Data Structures","text":"The main data structure used in GeophysicalModelGenerator.jl is GeoData, which contains info about the latitude, longitude and depth of a data set, as well as several data sets itself.","category":"page"},{"location":"man/datastructures/","page":"Data Structures","title":"Data Structures","text":"GeophysicalModelGenerator.GeoData\nGeophysicalModelGenerator.LonLatDepthGrid","category":"page"},{"location":"man/datastructures/#GeophysicalModelGenerator.GeoData","page":"Data Structures","title":"GeophysicalModelGenerator.GeoData","text":"GeoData(lon::Any, lat:Any, depth::GeoUnit, fields::NamedTuple)\n\nData structure that holds one or several fields with longitude, latitude and depth information.\n\n`depth` can have units of meter, kilometer or be unitless; it will be converted to km.\n`fields` should ideally be a NamedTuple which allows you to specify the names of each of the fields. \n    If case you only pass one array we will convert it to a NamedTuple with default name\n    Note that this is added as `(DataFieldName=Data,)` (don't forget the comma at the end)\n    In case you want to display a vector field in paraview, add it as a tuple: \n    `(Velocity=(Veast,Vnorth,Vup), Veas=Veast, Vnorth=Vnorth, Vup=Vup)`. You should add the magnitude as \n    separate fields, in case you want to color this in paraview\n\n`lon`,`lat`,`depth` should all have the same size as each of the `fields`\n\nExample\n\njulia> Lat         =   1.0:10.0;\njulia> Lon         =   11.0:20.0;\njulia> Depth       =   (-20:-11)*km;\njulia> Data        =   zeros(size(Lon));\njulia> Data_set    =   GeophysicalModelGenerator.GeoData(Lon,Lat,Depth,(DataFieldName=Data,))   \nGeoData \n  size  : (10,)\n  lon   ϵ [ 1.0 - 10.0]\n  lat   ϵ [ 11.0 - 20.0]\n  depth ϵ [ -20 km - -11 km]\n  fields: (:DataFieldName,)\n\n\n\n\n\n","category":"type"},{"location":"man/datastructures/#GeophysicalModelGenerator.LonLatDepthGrid","page":"Data Structures","title":"GeophysicalModelGenerator.LonLatDepthGrid","text":"LonLatDepthGrid(Lon::Any, Lat::Any, Depth:Any)\n\nCreates 3D arrays of Lon, Lat, Depth from 1D vectors or numbers\n\nExample 1: Create 3D grid\n\njulia> Lon,Lat,Depth =  LonLatDepthGrid(10:20,30:40,(-10:-1)km);\njulia> size(Lon)\n(11, 11, 10)\n\nExample 2: Create 2D lon/lat grid @ a given depth\n\njulia> Lon,Lat,Depth =  LonLatDepthGrid(10:20,30:40,-50km);\njulia> size(Lon)\n(11, 11)\n\nExample 3: Create 2D lon/depth grid @ a given lat\n\njulia> Lon,Lat,Depth =  LonLatDepthGrid(10:20,30,(-10:-1)km);\njulia> size(Lon)\n(11, 11)\n\nExample 4: Create 1D vertical line @ a given lon/lat point\n\njulia> Lon,Lat,Depth =  LonLatDepthGrid(10,30,(-10:-1)km);\njulia> size(Lon)\n(10, )\n\n\n\n\n\n","category":"function"},{"location":"man/paraview_output/#Paraview-output","page":"Paraview output","title":"Paraview output","text":"","category":"section"},{"location":"man/paraview_output/","page":"Paraview output","title":"Paraview output","text":"We have one main routine to generate Paraview output for data that is either stored in a GeoData structure (that has lat/lon info), or CartData (Cartesian). If GeoData is supplied it is internally automatically converted to the right format. Vectors, such as velocity, are also converted accordingly.","category":"page"},{"location":"man/paraview_output/","page":"Paraview output","title":"Paraview output","text":"GeophysicalModelGenerator.Write_Paraview","category":"page"},{"location":"man/paraview_output/#GeophysicalModelGenerator.Write_Paraview","page":"Paraview output","title":"GeophysicalModelGenerator.Write_Paraview","text":"Write_Paraview(DataSet::CartData, filename=\"test\"; PointsData=false)\n\nWrites a structure with Geodata to a paraview (or VTK) file\n\nExample 1: Write a 3D volume\n\njulia> Lon,Lat,Depth   =   LonLatDepthGrid(10:20,30:40,(-300:25:0)km);\njulia> Data_set        =   GeoData(Lat,Lon,Depth,(Depthdata=Depth,LonData=Lon))  \njulia> Write_Paraview(Data_set, \"test_depth3D\")\n\nExample 2: Horizontal slice @ given depth\n\njulia> Lon,Lat,Depth  =   LonLatDepthGrid(10:20,30:40,10km);\njulia> Data_set       =   GeoData(Lat,Lon,Depth,(Topography=Depth,))  \njulia> Write_Paraview(Data_set, \"test\")\n\nExample 3: Case with topography\n\njulia> Lon,Lat,Depth    =   LonLatDepthGrid(10:20,30:40,10km);\njulia> Depth[2:4,2:4,1] .=  25km     \njulia> Data_set         =   GeoData(Lat,Lon,Depth,(Topography=Depth,))  \njulia> Write_Paraview(Data_set, \"test2\")\n\nExample 4: Profile\n\njulia> Lon,Lat,Depth  =   LonLatDepthGrid(10:20,35,(-300:25:0)km);\njulia> Data_set       =   GeoData(Lat,Lon,Depth,(DataSet=Depth,Depth=Depth))  \njulia> Write_Paraview(Data_set, \"test\")\n\nExample 5: Velocity vectors\n\njulia> Lon,Lat,Depth  =   LonLatDepthGrid(10:20,30:40,10km);\njulia> Ve, Vn, Vz     =   ones(size(Depth)), ones(size(Depth))*0.5, zeros(size(Depth));\njulia> Data_set       =   GeoData(Lat,Lon,Depth,(DataSet=Depth, Velocity=(Ve,Vn,Vz)))\nGeoData \n  size  : (11, 11, 1)\n  lon   ϵ [ 30.0 - 40.0]\n  lat   ϵ [ 10.0 - 20.0]\n  depth ϵ [ 10.0 km - 10.0 km]\n  fields: (:DataSet, :Velocity)  \njulia> Write_Paraview(Data_set, \"test_Velocity\")\n\nExample 6: Unconnected points (e.g., earthquake locations)\n\nNote that these points should be 1D vectors.\n\njulia> Lon,Lat,Depth  =   LonLatDepthGrid(10:5:20,35:2:40,(-300:50:0)km);\njulia> Lon=Lon[:]; Lat=Lat[:]; Depth=Depth[:];\njulia> Data_set       =   GeoData(Lat,Lon,Depth,(DataSet=Depth[:],Depth=Depth*10));  \njulia> Write_Paraview(Data_set, \"test_Points\")\n\n\n\n\n\n","category":"function"},{"location":"man/tutorials/#Tutorials","page":"Overview","title":"Tutorials","text":"","category":"section"},{"location":"man/tutorials/","page":"Overview","title":"Overview","text":"The best way to learn how to use julia and GeophysicalModelGenerator to visualize your data is to look at the tutorials.","category":"page"},{"location":"man/tutorials/","page":"Overview","title":"Overview","text":"Interpolate 3D data to regular grid. Shows how to interpolate 3D seismic data, given on an irregular lon/lat grid, to a regular grid and create Paraview input from it.","category":"page"},{"location":"man/listfunctions/#List-of-all-functions","page":"List of functions","title":"List of all functions","text":"","category":"section"},{"location":"man/listfunctions/","page":"List of functions","title":"List of functions","text":"This page details the some of the guidelines that should be followed when contributing to this package.","category":"page"},{"location":"man/listfunctions/","page":"List of functions","title":"List of functions","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = GeophysicalModelGenerator","category":"page"},{"location":"#GeophysicalModelGenerator","page":"Home","title":"GeophysicalModelGenerator","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for GeophysicalModelGenerator.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The main purpose of this package is to simplify the process of going from 1D/2D/3D geophysical data to a 3D consistent model of the region. By simplifying the process of plotting the data, it becomes easier to compare different data sets, and generate a 3D models that can be used for other computations such as geodynamic simulations, or forward modelling of gravity anomalies.","category":"page"},{"location":"","page":"Home","title":"Home","text":"For this, GeophysicalModelGenerator provides the following functionality:","category":"page"},{"location":"","page":"Home","title":"Home","text":"A consistent GeoData structure, that holds the data along with lon/lat/depth information. \nRoutines to generate VTK files from the GeoData structure in order to visualize results in Paraview.\nThe ability to deal with points, 2D profiles and 3D volumes, for both scalar and vector values.\nRapidly import screenshots of published papers compare them with other data sets in 3D using paraview. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"The best way to get started is to look at the tutorials.","category":"page"},{"location":"man/tutorial_load3DSeismicData/#D-tomography-model-that-is-re-interpolated-on-a-regular-grid","page":"Interpolate irregular 3D seismic tomography","title":"3D tomography model that is re-interpolated on a regular grid","text":"","category":"section"},{"location":"man/tutorial_load3DSeismicData/#Goal","page":"Interpolate irregular 3D seismic tomography","title":"Goal","text":"","category":"section"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"This explains how to load a 3D seismic data set that is given in CSV format (comma separated ASCII), and plot it in paraview. The example is a shear-wave velocity model of the Alpine-Mediterranean region, described in:","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"El-Sharkawy et al. (2020), The Slab Puzzle of the Alpine‐Mediterranean Region: Insights from a new, High‐Resolution, Shear‐Wave Velocity Model of the Upper Mantle, G^3 https://doi.org/10.1029/2020GC008993","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"As the data is not given in a regular lon/lat grid, we first interpolate it to a different mesh.","category":"page"},{"location":"man/tutorial_load3DSeismicData/#Steps","page":"Interpolate irregular 3D seismic tomography","title":"Steps","text":"","category":"section"},{"location":"man/tutorial_load3DSeismicData/#.-Download-data","page":"Interpolate irregular 3D seismic tomography","title":"1. Download data","text":"","category":"section"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"The data is can be downloaded from https://www.seismologie.ifg.uni-kiel.de/en/research/research-data/mere2020model. Do that and start julia from the directory where it was downloaded.","category":"page"},{"location":"man/tutorial_load3DSeismicData/#.-Read-data-into-Julia","page":"Interpolate irregular 3D seismic tomography","title":"2. Read data into Julia","text":"","category":"section"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"The main data-file, El-Sharkawy-etal-G3.2020_MeRE2020_Mediterranean.csv, has 23 lines of comments (indicated with #), after which the data starts. We can use the build-in package DelimitedFiles to read in the data, and tell it that the data is seperated by |. We also want the resulting data to be stored as double precision values (Float64), and the end of every line is a linebreak (\\n).","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia> using DelimitedFiles\njulia> data=readdlm(\"El-Sharkawy-etal-G3.2020_MeRE2020_Mediterranean.csv\",'|',Float64,'\\n', skipstart=23,header=false)\n3695678×4 Matrix{Float64}:\n 32.12  -11.0    50.0  4.57\n 36.36  -11.0    50.0  4.47\n 38.32  -10.99   50.0  4.4\n 49.77  -10.99   50.0  4.52\n 29.82  -10.98   50.0  4.44\n 34.1   -10.98   50.0  4.56\n 40.26  -10.98   50.0  4.36\n 42.19  -10.97   50.0  4.38\n 44.1   -10.97   50.0  4.38\n  ⋮ ","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"Next, extract vectors from it:","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia> lat  = data[:,1];\njulia> lon  = data[:,2];\njulia> depth=-data[:,3];\njulia> Vs   = data[:,4];","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"Note that we put a minus sign in front of depth, as that is what GeophysicalModelGenerator.jl expects.","category":"page"},{"location":"man/tutorial_load3DSeismicData/#.-Reformat-the-data","page":"Interpolate irregular 3D seismic tomography","title":"3. Reformat the data","text":"","category":"section"},{"location":"man/tutorial_load3DSeismicData/#.1-Load-and-plot-the-data-layout","page":"Interpolate irregular 3D seismic tomography","title":"3.1 Load and plot the data layout","text":"","category":"section"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"The data is now available as a bunch of data points. In principle we can plot that in Paraview, but it is better to reformat it into a 3D grid.","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"Let's first have a look at how the data is distributed at a given depth level. For that, extract all points at 50 km depth and plot it (make sure you have the Plots.l package installed)","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia> ind=findall(x -> x==-50.0, depth)\njulia> using Plots\njulia> scatter(lon[ind],lat[ind],marker_z=Vs[ind], ylabel=\"latitude\",xlabel=\"longitude\",markersize=2.5, clims=(3.9, 4.8))","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"The result looks like this:","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"(Image: DataPoints)","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"So this is somewhat regular but not entirely and in some areas data points are missing. It is possible to create a VTK mesh that exactly respects this data, but for that we need knowledge on how the points are connected in 3D. The comments in the file do not provide this information, which is why we interpolate it on a regular lon/lat grid here which uses the same depth levels as in the data.","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"We extract the available depth levels with ","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia> Depth_vec = unique(depth)\n301-element Vector{Float64}:\n  -50.0\n  -51.0\n  -52.0\n  -53.0\n  -54.0\n  -55.0\n  -56.0\n    ⋮\n -345.0\n -346.0\n -347.0\n -348.0\n -349.0\n -350.0","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"which shows that the data set goes from [-350:1:-50]. Let's create a regular grid, which describes a somewhat smaller area than the data-points to ensure that we can do an interpolation without having to extrapolate","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia> using GeophysicalModelGenerator \njulia> Lon,Lat,Depth     =   LonLatDepthGrid(-10:0.5:40,32:0.25:50,Depth_vec);\njulia> size(Lon)\n(101, 73, 301)","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"The last command shows the size of our new grid.","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"We can plot our new Lon/Lat grid on top of the previous data:","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia> scatter!(Lon[:,:,1],Lat[:,:,1],color=:white, markersize=1.5, markertype=\"+\",legend=:none)","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"(Image: DataPoints_2)","category":"page"},{"location":"man/tutorial_load3DSeismicData/#.2-Interpolate-to-a-regular-grid","page":"Interpolate irregular 3D seismic tomography","title":"3.2 Interpolate to a regular grid","text":"","category":"section"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"Next, we need a method to interpolate the irregular datapoints @ a certain depth level to the white data points. ","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"There are a number of ways to do this, for example by employing GMT.jl, or by using GeoStats.jl.  In this example, we will employ GeoStats. If you haven't installed it yet, do that with","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia> ]\n(@v1.6) pkg> add GeoStats","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"We will first show how to interpolate data @ 50 km depth.","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia> using GeoStats\njulia> Cgrid = CartesianGrid((size(Lon,1),size(Lon,2)),(minimum(Lon),minimum(Lat)),(Lon[2,2,2]-Lon[1,1,1],Lat[2,2,2]-Lat[1,1,1]))\n101×73 CartesianGrid{2,Float64}\n  minimum: Point(-10.0, 32.0)\n  maximum: Point(40.5, 50.25)\n  spacing: (0.5, 0.25)\njulia> coord = PointSet([lon[ind]'; lat[ind]'])\n12278 PointSet{2,Float64}\n  └─Point(-11.0, 32.12)\n  └─Point(-11.0, 36.36)\n  └─Point(-10.99, 38.32)\n  └─Point(-10.99, 49.77)\n  └─Point(-10.98, 29.82)\n  ⋮\n  └─Point(45.97, 42.91)\n  └─Point(45.98, 37.22)\n  └─Point(45.99, 42.07)\n  └─Point(45.99, 46.76)\n  └─Point(45.99, 50.52)\njulia> Geo   = georef((Vs=Vs[ind],), coord)\n12278 MeshData{2,Float64}\n  variables (rank 0)\n    └─Vs (Float64)\n  domain: 12278 PointSet{2,Float64}\njulia> P = EstimationProblem(Geo, Cgrid, :Vs)\n2D EstimationProblem\n  data:      12278 MeshData{2,Float64}\n  domain:    101×73 CartesianGrid{2,Float64}\n  variables: Vs (Float64)\njulia> S   = IDW(:Vs => (distance=Euclidean(),neighbors=2)); \njulia> sol = solve(P, S)","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"Here, we interpolated the data based on the Euclidean distance. Other methods, such as Kriging, can be used as well.  Next, we can extract the data","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia>  sol_Vs = values(sol).Vs\njulia>  Vs_2D  = reshape(sol_Vs, size(domain(sol)))\njulia>  heatmap(Lon[:,1,1],Lat[1,:,1],Vs_2D', clims=(3.9, 4.8))","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"(Image: DataPoints_interpolated)","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"The final step is to repeat this procedure for all depth levels:","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia> Vs_3D = zeros(size(Depth));\njulia> for iz=1:size(Depth,3)\n          println(\"Depth = $(Depth[1,1,iz])\")\n          ind   = findall(x -> x==Depth[1,1,iz], depth)\n          coord = PointSet([lon[ind]'; lat[ind]'])\n          Geo   = georef((Vs=Vs[ind],), coord)\n          P     = EstimationProblem(Geo, Cgrid, :Vs)\n          S     = IDW(:Vs => (distance=Euclidean(),neighbors=2)); \n          sol   = solve(P, S)\n          sol_Vs= values(sol).Vs\n          Vs_2D = reshape(sol_Vs, size(domain(sol)))\n          Vs_3D[:,:,iz] = Vs_2D;\n        end","category":"page"},{"location":"man/tutorial_load3DSeismicData/#.-Generate-Paraview-file","page":"Interpolate irregular 3D seismic tomography","title":"4. Generate Paraview file","text":"","category":"section"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"Once the 3D velocity matrix has been generated, producing a Paraview file is done with the following command ","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia> using GeophysicalModelGenerator\njulia> Data_set    =   GeoData(Lon,Lat,Depth,(Vs_km_s=Vs_3D,))   \nGeoData \n  size  : (101, 73, 301)\n  lon   ϵ [ -10.0 - 40.0]\n  lat   ϵ [ 32.0 - 50.0]\n  depth ϵ [ -350.0 km - -50.0 km]\n  fields: (:Vs_km_s,) \njulia> Write_Paraview(Data_set, \"MeRe_ElSharkawy\")\n1-element Vector{String}:\n \"MeRe_ElSharkawy.vts\"","category":"page"},{"location":"man/tutorial_load3DSeismicData/#.-Plotting-data-in-Paraview","page":"Interpolate irregular 3D seismic tomography","title":"5. Plotting data in Paraview","text":"","category":"section"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"In paraview you can open the file and visualize it:","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"(Image: DataPoints_Paraview)","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"Note that we employ the perceptually uniform color map Barlow, which you can download here.","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"If you want to clip the data set @ 200 km depth, you need to select the Clip tool, select Sphere as a clip type, set the center to [0,0,0] and set the radius to 6171 (=radius earth - 200 km).","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"(Image: Tutorial_ElSharkawy_MeRe_DataPoints_Paraview_2)","category":"page"},{"location":"man/tutorial_load3DSeismicData/#.-Julia-script","page":"Interpolate irregular 3D seismic tomography","title":"6. Julia script","text":"","category":"section"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"The full julia script that does it all is given here. You need to be in the same directory as in the data file, after which you can run it in julia with","category":"page"},{"location":"man/tutorial_load3DSeismicData/","page":"Interpolate irregular 3D seismic tomography","title":"Interpolate irregular 3D seismic tomography","text":"julia> include(\"MeRe_ElSharkawy.jl\")","category":"page"}]
}
