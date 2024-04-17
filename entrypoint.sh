
git remote remove target
git remote add target https://${INPUT_TARGET_USERNAME}:${INPUT_TARGET_TOKEN}@${INPUT_TARGET_URL#https://}

case "${GITHUB_EVENT_NAME}" in
    push)
        git config --global user.email "github-action@gmail.com"
        git config --global user.name "Github Action"
        git config pull.rebase false
        git pull target main
        git push target main
        git push --tags target
        ;;
    *)
        break
        ;;
esac
