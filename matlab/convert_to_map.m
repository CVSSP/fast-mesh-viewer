function convert_to_map(files_in, fld_out)
    fld_in = fileparts(files_in);
    [~, file_name, file_ext] = arrayfun( ...
            @(f)fileparts(f.name), ...
            dir(files_in), ...
            'UniformOutput', 0 ...
    );
    numfiles = numel(file_name);
    
    if ~exist(fld_out, 'dir')
        mkdir(fld_out);
    end
    
    for i = 1:numfiles
        file_in = fullfile(fld_in, [file_name{i} file_ext{i}]);
        file_out = fullfile(fld_out, [file_name{i} '.map']);
        
        m = Mesh.load(file_in);
        
        ix = m.texturecoords < 0.01;
        ix = all(ix(m.textureindices), 2);
        m.filterfaces(~ix);
        m.makemanifold(true);
        m.filterfaces(m.surfaces() == 1);
        
        mm = MapMesh.fromMesh(m, [128 128], [512 512]);
        mm.saveas(file_out);
    end
end
