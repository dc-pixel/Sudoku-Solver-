# Contributing

Keep solver logic deterministic and separate from UI or I/O concerns.

Before submitting changes:

- build with C++17;
- run the existing tests;
- add a regression test for bug fixes;
- avoid changing solver behavior without documenting the change.

Use focused commit messages such as `fix: reject invalid grids` or `test: cover unsolvable puzzle`.
