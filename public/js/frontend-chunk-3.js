(self.webpackChunk=self.webpackChunk||[]).push([["frontend-chunk-3"],{"./resources/js/components/Login.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/Login.vue + 6 modules ***!
  \*******************************************************/(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  "default": () => (/* binding */ Login)\n});\n\n// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm-bundler.js\nvar vue_esm_bundler = __webpack_require__("./node_modules/vue/dist/vue.esm-bundler.js");\n;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[15].use[0]!./resources/js/components/Login.vue?vue&type=template&id=6bdc8b8e&scoped=true\n\n\nconst _withId = /*#__PURE__*/(0,vue_esm_bundler.withScopeId)("data-v-6bdc8b8e");\n\n(0,vue_esm_bundler.pushScopeId)("data-v-6bdc8b8e");\n\nconst _hoisted_1 = {\n  key: 0,\n  id: "login"\n};\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue_esm_bundler.createVNode)("h1", null, "Login", -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = {\n  class: "text-red"\n};\n\n(0,vue_esm_bundler.popScopeId)();\n\nconst render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {\n  return !_ctx.isLoggedIn ? ((0,vue_esm_bundler.openBlock)(), (0,vue_esm_bundler.createBlock)("div", _hoisted_1, [_hoisted_2, (0,vue_esm_bundler.withDirectives)((0,vue_esm_bundler.createVNode)("input", {\n    type: "text",\n    name: "username",\n    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => _ctx.input.email = $event),\n    placeholder: "Username"\n  }, null, 512\n  /* NEED_PATCH */\n  ), [[vue_esm_bundler.vModelText, _ctx.input.email]]), (0,vue_esm_bundler.withDirectives)((0,vue_esm_bundler.createVNode)("input", {\n    type: "password",\n    name: "password",\n    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => _ctx.input.password = $event),\n    placeholder: "Password"\n  }, null, 512\n  /* NEED_PATCH */\n  ), [[vue_esm_bundler.vModelText, _ctx.input.password]]), (0,vue_esm_bundler.createVNode)("button", {\n    type: "button",\n    onClick: _cache[3] || (_cache[3] = $event => _ctx.login())\n  }, "Login"), (0,vue_esm_bundler.createVNode)("p", _hoisted_3, (0,vue_esm_bundler.toDisplayString)(_ctx.error), 1\n  /* TEXT */\n  ), (0,vue_esm_bundler.createVNode)("p", null, (0,vue_esm_bundler.toDisplayString)(_ctx.isLoggedIn), 1\n  /* TEXT */\n  )])) : (0,vue_esm_bundler.createCommentVNode)("v-if", true);\n});\n;// CONCATENATED MODULE: ./resources/js/components/Login.vue?vue&type=template&id=6bdc8b8e&scoped=true\n\n// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm-bundler.js\nvar vuex_esm_bundler = __webpack_require__("./node_modules/vuex/dist/vuex.esm-bundler.js");\n;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[15].use[0]!./resources/js/components/Login.vue?vue&type=script&lang=js\n\n\n/* harmony default export */ const Loginvue_type_script_lang_js = ((0,vue_esm_bundler.defineComponent)({\n  setup(props, {\n    attrs,\n    root\n  }) {\n    const input = (0,vue_esm_bundler.ref)({\n      email: \'\',\n      password: \'\'\n    });\n    const error = (0,vue_esm_bundler.ref)(\'\');\n    const store = (0,vuex_esm_bundler.useStore)();\n    const user = (0,vue_esm_bundler.computed)(() => store.state.user);\n    const isLoggedIn = (0,vue_esm_bundler.computed)(() => store.state.isLoggedIn);\n    const {\n      appContext: {\n        config: {\n          globalProperties\n        }\n      }\n    } = (0,vue_esm_bundler.getCurrentInstance)();\n\n    const clearInput = () => {\n      input.value.email = \'\';\n      input.value.password = \'\';\n    };\n\n    (0,vue_esm_bundler.onMounted)(() => {\n      store.dispatch(\'isLogged\', attrs[\'user\']);\n    });\n\n    const login = () => {\n      if (input.value.email !== "" && input.value.password !== "") {\n        store.dispatch(\'fetchUser\', input.value).then(() => {\n          if (user) {\n            store.dispatch(\'isLogged\', true).then(() => {\n              localStorage.setItem(\'user\', true);\n              window.location.href = \'/\';\n            });\n          } else {\n            error.value = \'Email or password is incorrect!\';\n          }\n        });\n      } else {\n        console.log("A email and password must be present");\n      }\n    };\n\n    clearInput();\n    return {\n      input,\n      error,\n      store,\n      user,\n      isLoggedIn,\n      login,\n      clearInput\n    };\n  }\n\n}));\n;// CONCATENATED MODULE: ./resources/js/components/Login.vue?vue&type=script&lang=js\n \n;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[15].use[0]!./resources/js/components/Login.vue?vue&type=style&index=0&id=6bdc8b8e&scoped=true&lang=css\n// extracted by mini-css-extract-plugin\n\n;// CONCATENATED MODULE: ./resources/js/components/Login.vue?vue&type=style&index=0&id=6bdc8b8e&scoped=true&lang=css\n\n;// CONCATENATED MODULE: ./resources/js/components/Login.vue\n\n\n\n\n;\nLoginvue_type_script_lang_js.render = render\nLoginvue_type_script_lang_js.__scopeId = "data-v-6bdc8b8e"\n/* hot reload */\nif (false) {}\n\nLoginvue_type_script_lang_js.__file = "resources/js/components/Login.vue"\n\n/* harmony default export */ const Login = (Loginvue_type_script_lang_js);\n\n//# sourceURL=webpack:///./resources/js/components/Login.vue_+_6_modules?')}}]);