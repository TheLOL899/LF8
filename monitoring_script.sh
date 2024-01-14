#!/bin/bash

# Monitoring-Skript

# Funktion, um eine Nachricht zu protokollieren
log() {
  echo "$(date) - $1"
}

# Funktion, um Anwendungsstatus zu überwachen
monitor_application() {
  http_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/fragen)
  if [ "$http_status" -eq 200 ]; then
    log "API ist verfügbar (HTTP-Status: $http_status)"
  else
    log "WARNUNG: API ist möglicherweise nicht verfügbar (HTTP-Status: $http_status)"
  fi
}

# Funktion, um die Anwendung zu starten
start_application() {
  log "Starte die Anwendung"
  npm start &
  # Füge hier eine Wartezeit ein, wenn es Zeit braucht, um zu starten
  sleep 30  # Beispiel: Warte 30 Sekunden, passt dies an deine Bedürfnisse an
}

# Hauptfunktion für das Monitoring
main() {
  log "Starte das Monitoring-Skript"

  start_application  # Anwendung starten

  # Wartezeit, um sicherzustellen, dass die Anwendung gestartet ist
  sleep 10  # Beispiel: Warte 10 Sekunden, passt dies an deine Bedürfnisse an

  monitor_application  # Überwache die Anwendung

  log "Monitoring-Skript abgeschlossen"
}

# Hauptprogramm
main
