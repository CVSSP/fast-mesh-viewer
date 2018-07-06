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
    input_file = fullfile(fld_in, [file_name{i} file_ext{i}]);
    m = Mesh.load(input_file, '', 'isdirty', true);

    % Export to obj and safe zipped.

    [~,~,tex_ext] = fileparts(m.texturefile);
    files = strcat(file_name{i}, {'.obj', '.mtl', tex_ext});
    fullfiles = cellfun(@(f)fullfile(fld_out,f), files, 'UniformOutput',0);
    zipfile = fullfile(fld_out, [file_name{i} '.zip']);

    m.saveas(fullfiles{1});
    zip(zipfile, files, fld_out);
    delete(fullfiles{:});

    % Convert to MapMesh and save for web viewer.

    m.filterfaces(m.surfaces() == 1);
    mm = MapMesh.fromMesh(m, [128 128], [512 512]);

    mapfile = fullfile(fld_out, [file_name{i} '.map']);
    mm.saveas(mapfile);
  end
end
