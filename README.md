View
====

An online 3D file viewer.


This package consists of a Matlab script to convert meshes to the .map format
for fast loading over the web, together with a 3D viewer app (web page). You
can access this at [view.facer2vm.org](//view.facer2vm.org/).


Configuration
-------------

To configure the data root location (from which data files are loaded), in the
[index.html](index.html) file change `var root = '...';` to the required value.

Provide the name of the mesh file in the URL hash:
`//domain/fast-mesh-viewer/#filename` will load `filename.map` from the data
root.


Licence
-------

[LGPL v3](LICENCE).

Copyright 2018, Paul Koppen, University of Surrey.
