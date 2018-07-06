Fast Mesh Viewer
================

An online 3D file viewer, with an incredibly compressed file format.


This package consists of a web-app for viewing meshes online and a Matlab script
to convert meshes from OBJ or VRML format into the required format for the
viewer.

The viewer file format, MAP, is an incredibly compressed format and at the same
time ultimatly suitable for web browsers. A typical mesh of around 5 MB in MAP
format typically takes aroud 100 KB. Compression ratio ~ 50x.

The MAP format is not directly suitable for 3D mesh editing (software), so the
Matlab script also exports a ZIP containing the source mesh in OBJ format. The
web viewer renders the MAP mesh and shows a download link to the ZIP file.


Viewer
------

### Install

Copy the `index.html` file to wherever you need it in your website and adjust
the data root (see below) to the required path.

### Configure

The [index.html][index] (and [dev.html][dev]) declare a `data-root`
attribute on the `<body>` tag to point to the base folder from which files are
loaded.

Provide the name of the mesh file in the URL hash:
`//domain/fast-mesh-viewer/#filename` will load `filename.map` from the data
root.

### Build from source

Run [build-js.bat](build-js) and follow the instructions to create your own
`index.html`.


Licence
-------

[LGPL v3][LICENCE].

Copyright 2018, Paul Koppen, University of Surrey.



[build-js]: https://github.com/CVSSP/fast-mesh-viewer/blob/master/viewer/assets/build-js.bat
[dev]: https://github.com/CVSSP/fast-mesh-viewer/blob/master/viewer/dev.html
[index]: https://github.com/CVSSP/fast-mesh-viewer/blob/master/viewer/index.html
[LICENCE]: https://github.com/CVSSP/fast-mesh-viewer/blob/master/LICENSE
