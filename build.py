# This script updates the Script version numbers
# to force browsers to load the most recent version.

import sys, time

paths = ['view.html', 'index.html', 'editor/index.html']

for path in paths:

  # get unit time
  unix_time = int(time.time())

  # read index.html
  f = open(path, "r")
  lines = f.readlines()
  f.close()

  # replace version number(s)
  for i, line in enumerate(lines):
      if '?version=' in line:
          tokens = line.split('?')
          lines[i] = tokens[0] + '?version=' + str(unix_time) + '"></script>\n'

  # write index.html
  f = open(path, "w")
  f.write("".join(lines))
  f.close()
