# Raptor

Intercepts all your outgoing requests, and tacks on the `X-Correlation-Id` header.

Currently the `CorrelationId` is obtained from the query string parameters, but it could also be injected via a cookie instead. You have options 😀
