#!/bin/bash

# Monitoring-Skript

# Funktion, um eine Nachricht zu protokollieren
log() {
  echo "$(date) - $1"
}

# Funktion, um Anwendungsstatus zu überwachen
monitor_application() {
  http_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
  if [ "$http_status" -eq 200 ]; then
    log "Anwendung ist verfügbar (HTTP-Status: $http_status)"
  else
    log "WARNUNG: Anwendung ist möglicherweise nicht verfügbar (HTTP-Status: $http_status)"
  fi
}

# Hauptfunktion für das Monitoring
main() {
  log "Starte das Monitoring-Skript"

  monitor_application

  log "Monitoring-Skript abgeschlossen"
}

# Hauptprogramm
main
