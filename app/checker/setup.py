from setuptools import setup, Extension
import pybind11

ext = Extension(
    "password_check",                 # module name (import name)
    ["check_pass.cpp"],               # cpp file
    include_dirs=[pybind11.get_include()],
    language="c++",
    extra_compile_args=["-O3"],       # speed
)

setup(
    name="password_check",
    version="0.1",
    ext_modules=[ext],
)
