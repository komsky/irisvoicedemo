
const formatPath = (sub, path) =>
  path.replace(/{{.*}}/, sub)

export default formatPath
