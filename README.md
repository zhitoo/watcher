# 🔁 Watcher

A simple CLI tool to watch for file changes in your Laravel project and automatically run a custom command — ideal for hot-reloading Laravel Octane in development.

> Inspired by Laravel Octane with developer happiness in mind.

---

## 🚀 Features

* 📦 Watches all files in the project
* 🔁 Automatically runs a command (like `php artisan octane:reload`) on changes
* 🧠 Ignores paths listed in a `.watcherignore` file (like `.gitignore`)
* ⚡ Lightweight and fast (powered by [chokidar](https://github.com/paulmillr/chokidar))
* 🎯 Perfect for Docker + Laravel Octane development environments

---

## 📦 Installation

### Option 1: Install Globally (Recommended)   
cd to project root
```bash
npm i
npm install -g .
```

---

## ⚙️ Usage

```bash
watcher "your-reload-command-here"
```

Examples:

```bash
watcher "make reload"
```

```bash
watcher "docker exec php-octane php artisan octane:reload"
```

```bash
watcher "docker compose exec app php artisan octane:reload"
```

---

## 🚫 Ignoring Files & Folders

You can create a `.watcherignore` file in the root of your project to prevent reloading on certain files or folders.

**Example `.watcherignore` file:**

```gitignore
node_modules
vendor
storage/logs
public/storage
.git
```

---

## ✅ Why Use This?

Laravel Octane doesn’t reload automatically on file changes inside Docker.
This tool bridges the gap by watching your files and reloading Octane **only when needed** — clean, minimal, no unnecessary reloads.

---

## 👨‍💻 Author

Created with ❤️ by \[hossein shafiei].

Feel free to contribute or suggest features.

---

## 🪪 License

MIT
