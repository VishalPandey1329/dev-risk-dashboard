# Dev Risk Dashboard - Complete Review

## Current status

The application works as a simple full-stack prototype with:
- A React UI for entering risk metrics.
- An Express API that calculates score and risk level.
- Basic negative-value validation.
- In-memory trend/history visualization on the frontend.

## What is still needed (priority order)

## 1) Critical fixes

1. **Fix frontend test suite**
   - `client/src/App.test.js` still checks for the default CRA text (`learn react`) and does not test real dashboard behavior.
   - Replace with tests for:
     - Rendering key form inputs.
     - Rendering calculation button.
     - Displaying API result (with mocked `fetch`).

2. **Harden backend input validation**
   - Current API checks only for negative numbers.
   - Add validation for:
     - Missing fields.
     - Non-numeric values (`NaN`, strings).
     - Invalid booleans for `hasTests`.

3. **Environment-based API URL**
   - Frontend uses hardcoded `http://localhost:5000/risk`.
   - Use an environment variable (`REACT_APP_API_BASE_URL`) to support staging/production.

## 2) Important improvements

4. **Persist risk history**
   - Current history is in React state only and is lost on refresh.
   - Add storage (backend memory, file, or database).

5. **Add backend test coverage**
   - Introduce API tests for `/risk` route and validation edge cases.

6. **Add user-friendly error UI**
   - Current errors use `alert`.
   - Show inline error messages and loading states.

7. **Refactor inline styles**
   - Most UI styles are inline in `App.js` while `App.css` contains mostly unused CRA defaults.
   - Move styles into CSS modules or component CSS for maintainability.

## 3) Nice-to-have enhancements

8. **Configuration-driven risk weights**
   - Move thresholds and weights to config constants or admin-editable settings.

9. **Accessibility pass**
   - Add labels/ids linkage and better table semantics for screen readers.

10. **CI pipeline**
    - Add GitHub Actions for lint, test, and build checks on every PR.

11. **Security hardening**
    - Add `helmet`, API rate limiting, and CORS origin restrictions.

## Recommended next sprint

- Replace `App.test.js` with meaningful tests.
- Add robust backend schema validation.
- Move API base URL to environment config.
- Add one CI workflow running backend and frontend checks.

These steps will move the project from "good demo" to "production-ready starter".
