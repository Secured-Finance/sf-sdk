SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

# Generate the package-lock.json file
npm install --ignore-scripts --package-lock-only --silent

# Return exit code 1 if package-lock.json is different from the one in the repo
git diff --quiet $SCRIPTPATH/../package-lock.json
if [ $? -eq 0 ]; then
  echo "package-lock.json is up to date"
  exit 0
else
  echo "package-lock.json is not up to date"
  exit 1
fi
