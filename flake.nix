{
  description = "Development shell with Bun";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-utils.url = "github:numtide/flake-utils";
    bun-pkgs = {
      url = "github:NixOS/nixpkgs/41da1e3ea8e23e094e5e3eeb1e6b830468a7399e"; # has Bun 1.2.16
      flake = false;
    };
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    bun-pkgs,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        devShells.default = pkgs.mkShell {
          packages = [
            (import bun-pkgs {inherit system;}).bun
          ];
        };
      }
    );
}
