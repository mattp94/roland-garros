import Conf from "conf";

import pkg from "../package.json" assert { type: "json" };

export default new Conf({ projectName: pkg.name });
