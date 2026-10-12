#!/usr/bin/env make

# Make configuration
SHELL							= /usr/bin/bash
.DEFAULT_GOAL: all
.DELETE_ON_ERROR:

# Metadata
export APPID			= pricy

# Build environment
export SRCDIR_TOP	= .
export SRCDIR			= $(SRCDIR_TOP)/src

# Installation directories
export BUILDIR		= $(SRCDIR_TOP)/build

# Utilites
MKDIR_P						= /usr/bin/mkdir -p
ECMA_VERSION			= es2026
NODE_VERSION			= 26.11.1
NODE_VVERSION			= v$(NODE_VERSION)
NVM_BIN						= $(HOME)/.nvm/versions/node/$(NODE_VVERSION)/bin
NPX 							= $(NVM_BIN)/npx
NODE							= $(NPX) node
TS_VERSION				= 7.0
TS_VVERSION				= v$(TS_VERSION)
TS								= $(NPX) tsc
TSX								= $(NPX) tsx
ESBUILD 					= $(NPX) esbuild
PRETTIER					= $(NPX) prettier
ESLINT						= $(NPX) eslint
NODEMON						= $(NPX) nodemon
SERVER						= $(NPX) http-server

.PHONY: all
all: build

.PHONY: setup
setup:
	git config --local include.path ../.gitconfig

.PHONY: build
build: $(BUILDIR)/index.html
	$(NODE) esbuild.config.mjs

$(BUILDIR)/index.html: $(SRCDIR)/index.html | $(BUILDIR)/
	cp $< $@

$(BUILDIR)/:
	$(MKDIR_P) $@

.PHONY: watch
watch:
	$(NODEMON) --watch $(SRCDIR) -e html,js,css,ts --exec 'make build'

.PHONY: serve
serve: build
	$(SERVER) --gzip -c-1 $(BUILDIR)

.PHONY: check
check:
	$(TS) --noEmit

.PHONY: format
format:
	git diff --cached --name-only | while read -r file; do \
		case "$$file" in \
			*.json|*.js|*.ts|*.tsx|*.jsx|*.html|*.css|*.mjs|*.cjs) \
			if [[ -f "$$file" ]]; then \
				$(PRETTIER) --config prettier.config.mjs --write "$$file"; \
				git add "$$file"; \
			fi \
		esac; done

.PHONY: lint
ARGS ?= # --fix
lint:
	git diff --cached --name-only | while read -r file; do \
		case "$$file" in \
			*.js|*.ts|*.jsx|*.tsx|*.mjs|*.cjs|*.html|*.mts|*.cts) \
				[[ -f "$$file" ]] && $(ESLINT) --config eslint.config.mjs $(ARGS) "$$file" ;; \
		esac; done
