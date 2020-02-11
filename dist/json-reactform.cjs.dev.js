'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var reactstrap = require('reactstrap');
var DatePicker = _interopDefault(require('react-datepicker'));
require('react-datepicker/dist/react-datepicker.css');
var PropTypes = _interopDefault(require('prop-types'));
var md = require('react-icons/md');
var Select = _interopDefault(require('react-select'));

var ModalSpinner = function ModalSpinner(_ref) {
  var _ref$isOpen = _ref.isOpen,
      isOpen = _ref$isOpen === void 0 ? false : _ref$isOpen,
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? '' : _ref$message,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? '' : _ref$type,
      _ref$onAccept = _ref.onAccept,
      onAccept = _ref$onAccept === void 0 ? function () {
    return false;
  } : _ref$onAccept,
      _ref$onDismiss = _ref.onDismiss,
      onDismiss = _ref$onDismiss === void 0 ? function () {
    return false;
  } : _ref$onDismiss,
      _ref$btnAcceptId = _ref.btnAcceptId,
      btnAcceptId = _ref$btnAcceptId === void 0 ? '' : _ref$btnAcceptId;
  return React.createElement(reactstrap.Modal, {
    isOpen: isOpen,
    centered: true,
    returnFocusAfterClose: false,
    backdrop: "static"
  }, React.createElement(reactstrap.ModalHeader, null, "Pop-Up Message"), React.createElement(reactstrap.ModalBody, {
    className: "d-flex align-items-center font-weight-bold"
  }, type === 'loading' ? React.createElement(reactstrap.Spinner, {
    color: "success",
    className: "mr-2"
  }) : null, type === 'success' ? React.createElement(md.MdCheckCircle, {
    className: "text-success",
    size: 30
  }) : null, type === 'error' ? React.createElement(md.MdError, {
    className: "text-danger",
    size: 30
  }) : null, type === 'confirm' ? React.createElement(md.MdQuestionAnswer, {
    className: "text-dark",
    size: 30
  }) : null, React.createElement("span", {
    style: {
      fontSize: '18px'
    },
    className: "ml-3"
  }, message)), type !== 'loading' ? React.createElement(reactstrap.ModalFooter, null, React.createElement(reactstrap.Button, {
    color: "danger",
    onClick: onDismiss
  }, type === 'confirm' ? 'Cancel' : 'Close'), type === 'confirm' ? React.createElement(reactstrap.Button, {
    color: "primary",
    id: btnAcceptId,
    onClick: onAccept
  }, "Yes") : null) : null);
};

ModalSpinner.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.oneOf(['loading', 'success', 'error', 'confirm']),
  onDismiss: PropTypes.func,
  onAccept: PropTypes.func
};

function numberToCurrency(n) {
  // format number 1000000 to 1,234,567
  var str = typeof n !== 'string' ? String(n) : n;
  return str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function currencyToNumber(n) {
  // format number 1,234,567 to 1000000
  var str = typeof n !== 'string' ? String(n) : n;
  return str.replace(/[\,\.]/g, "");
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var CustomDatePicker = React.forwardRef(function (_ref, ref) {
  var onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      value = _ref.value,
      id = _ref.id,
      onClick = _ref.onClick,
      name = _ref.name,
      disabled = _ref.disabled;
  return React.createElement(reactstrap.Input, {
    ref: ref,
    onChange: onChange,
    placeholder: placeholder,
    value: value,
    id: id,
    name: name,
    onClick: onClick,
    disabled: disabled
  });
});

function usePrevious(value) {
  var ref = React.useRef();
  React.useEffect(function () {
    ref.current = value;
  });
  return ref.current;
}

var index = (function (_ref2) {
  var model = _ref2.model,
      onSubmit = _ref2.onSubmit,
      onChange = _ref2.onChange;
  var defaultState = Object.keys(model).reduce(function (a, b) {
    return a[b] = model[b].type === 'date' ? new Date().toISOString() : model[b].type === 'checkbox' ? [] : "", a;
  }, {});
  var defaultCurrency = Object.keys(model).reduce(function (a, b) {
    if (model[b].type === 'currency') {
      a[b] = '';
    }

    return a;
  }, {});

  var _React$useState = React.useState(defaultState),
      state = _React$useState[0],
      setState = _React$useState[1];

  var _React$useState2 = React.useState(defaultCurrency),
      currency = _React$useState2[0],
      setCurrency = _React$useState2[1];

  var prevState = usePrevious(state);

  var _React$useState3 = React.useState({
    open: false,
    type: 'loading',
    // success, error
    message: ''
  }),
      modal = _React$useState3[0],
      setModal = _React$useState3[1];

  var clearRequest = function clearRequest() {
    cancelSource.cancel('component unmounted');
  };

  var formItems = [];

  var onFormSubmit = function onFormSubmit(e) {
    e.preventDefault();
    setModal(function (values) {
      return _extends({}, values, {
        type: 'loading',
        message: 'Saving..',
        open: true
      });
    });
    var newState = Object.keys(state).reduce(function (a, b) {
      return a[b] = model[b].type === 'number' ? parseInt(state[b]) : state[b], a;
    }, {});
    onSubmit(newState).then(function () {
      setState(defaultState);
      setModal(function (values) {
        return _extends({}, values, {
          type: 'success',
          message: 'Success'
        });
      });
    })["catch"](function (err) {
      setModal(function (values) {
        return _extends({}, values, {
          type: 'error',
          message: 'Failed to Save'
        });
      });
    });
  };

  var onChangeState = function onChangeState(e) {
    var changedObject = {};
    var _e$currentTarget = e.currentTarget,
        value = _e$currentTarget.value,
        name = _e$currentTarget.name; // const value = e.currentTarget.value

    changedObject[name] = value;
    setState(_extends({}, state, {}, changedObject));
  };

  var onChangeCurrency = function onChangeCurrency(e) {
    var changedObject = {};
    var currencyObject = {};
    var _e$currentTarget2 = e.currentTarget,
        value = _e$currentTarget2.value,
        name = _e$currentTarget2.name; // const value = e.currentTarget.value

    changedObject[name] = currencyToNumber(value);
    setState(_extends({}, state, {}, changedObject));
    currencyObject[name] = numberToCurrency(value);
    setCurrency(_extends({}, currency, {}, currencyObject));
  }; // khususon onchange si react-select


  var onChangeStateSelect = function onChangeStateSelect(name, selectedOption) {
    var changedObject = {}; // const value = e.currentTarget.value

    changedObject[name] = selectedOption === null ? '' : selectedOption;
    setState(_extends({}, state, {}, changedObject));
  }; // onchange checkbox


  var onChangeStateCheckbox = function onChangeStateCheckbox(key, value) {
    var changedObject = {};
    changedObject[key] = state[key].includes(value) ? state[key].filter(function (item) {
      return item != value;
    }) : [].concat(state[key], [value]);
    setState(_extends({}, state, {}, changedObject));
  };

  var onChangeStateDate = function onChangeStateDate(key, value) {
    var changedObject = {};
    changedObject[key] = value.toISOString();
    setState(_extends({}, state, {}, changedObject));
  };

  Object.keys(model).forEach(function (key) {
    if (model[key].type === 'date') {
      formItems.push(React.createElement(reactstrap.FormGroup, {
        key: key,
        row: true,
        className: "mb-4"
      }, React.createElement(reactstrap.Label, {
        "for": key,
        sm: 4
      }, key, " ", model[key].required ? '*' : null), React.createElement(reactstrap.Col, {
        sm: 8,
        className: "d-flex flex-column"
      }, React.createElement(DatePicker, {
        id: key,
        name: key,
        selected: new Date(state[key]),
        onChange: function onChange(value) {
          return onChangeStateDate(key, value);
        },
        dateFormat: model[key].format || "dd-MM-yyyy",
        customInput: React.createElement(CustomDatePicker, null),
        disabled: model[key].disabled
      }))));
    } else if (model[key].type === 'select') {
      formItems.push(React.createElement(reactstrap.FormGroup, {
        key: key,
        row: true,
        className: "mb-4"
      }, React.createElement(reactstrap.Label, {
        "for": key,
        sm: 4
      }, key, " ", model[key].required ? '*' : null), React.createElement(reactstrap.Col, {
        sm: 8,
        className: "d-flex flex-column"
      }, function () {
        return model[key].options.length > 0 ? React.createElement(React.Fragment, null, React.createElement(Select, {
          name: key,
          id: key,
          searchable: true,
          isClearable: true,
          required: model[key].required,
          defaultValue: model[key].options[0].value || '',
          value: state[key],
          onChange: function onChange(option) {
            return onChangeStateSelect(key, option);
          },
          options: model[key].options,
          isDisabled: model[key].disabled
        }), React.createElement("input", {
          // this field hidden, for detect validation only
          tabIndex: -1,
          autoComplete: "off",
          style: {
            opacity: 0,
            height: 0
          },
          value: state[key],
          required: model[key].required,
          onChange: function onChange(e) {
            return e.preventDefault();
          }
        })) : React.createElement(reactstrap.Spinner, null);
      }())));
    } else if (model[key].type === 'checkbox') {
      formItems.push(React.createElement(reactstrap.FormGroup, {
        key: key,
        row: true,
        className: "mb-4"
      }, React.createElement(reactstrap.Label, {
        "for": key,
        sm: 4
      }, key, " ", model[key].required ? '*' : null), React.createElement(reactstrap.Col, {
        sm: 8,
        className: "d-flex flex-column"
      }, model[key].options.map(function (item, index) {
        return React.createElement(reactstrap.CustomInput, {
          type: "checkbox",
          label: item.label,
          id: item.value,
          key: item.value,
          name: key,
          value: item.value,
          checked: state[key].includes(item.value),
          required: index === 0 && state[key].length === 0 && model[key].required,
          disabled: model[key].disabled,
          onChange: function onChange(e) {
            return onChangeStateCheckbox(key, e.target.value);
          }
        });
      }))));
    } else if (model[key].type === 'radio') {
      formItems.push(React.createElement(reactstrap.FormGroup, {
        key: key,
        row: true,
        className: "mb-4"
      }, React.createElement(reactstrap.Label, {
        "for": key,
        sm: 4
      }, key, " ", model[key].required ? '*' : null), React.createElement(reactstrap.Col, {
        sm: 8,
        className: "d-flex flex-column"
      }, model[key].options.map(function (item, index) {
        return React.createElement(reactstrap.CustomInput, {
          type: "radio",
          label: item.label,
          id: item.value,
          key: item.value,
          name: key,
          value: item.value,
          checked: state[key].includes(item.value),
          required: model[key].required,
          disabled: model[key].disabled,
          onChange: onChangeState
        });
      }))));
    } else if (model[key].type === 'currency') {
      formItems.push(React.createElement(reactstrap.FormGroup, {
        key: key,
        row: true,
        className: "mb-4"
      }, React.createElement(reactstrap.Label, {
        "for": key,
        sm: 4
      }, key, " ", model[key].required ? '*' : null), React.createElement(reactstrap.Col, {
        sm: 8,
        className: "d-flex flex-column"
      }, React.createElement(reactstrap.Input, {
        type: "text",
        onChange: onChangeCurrency,
        value: currency[key],
        name: key,
        id: key,
        required: model[key].required,
        disabled: model[key].disabled
      }))));
    } else if (model[key].type === 'submit') {
      formItems.push(React.createElement(reactstrap.Row, {
        key: key,
        className: "mb-4"
      }, React.createElement(reactstrap.Col, {
        sm: 4
      }), React.createElement(reactstrap.Col, {
        sm: 8
      }, React.createElement(reactstrap.Button, {
        type: model[key].type,
        color: "success",
        disabled: model[key].disabled
      }, key))));
    } else {
      formItems.push(React.createElement(reactstrap.FormGroup, {
        key: key,
        row: true,
        className: "mb-4"
      }, React.createElement(reactstrap.Label, {
        "for": key,
        sm: 4
      }, key, " ", model[key].required ? '*' : null), React.createElement(reactstrap.Col, {
        sm: 8,
        className: "d-flex flex-column"
      }, React.createElement(reactstrap.Input, {
        type: model[key].type,
        onChange: onChangeState,
        value: state[key],
        name: key,
        id: key,
        required: model[key].required,
        disabled: model[key].disabled
      }))));
    }
  });
  React.useEffect(function () {
    return function () {
      clearRequest();
    };
  }, []);
  React.useEffect(function () {
    if (onChange) {
      var changedObject = [];

      if (prevState && Object.keys(prevState).length > 0) {
        Object.keys(prevState).forEach(function (key) {
          if (prevState[key] !== state[key]) {
            changedObject.push(key);
          }
        });
        onChange({
          value: state,
          changed: changedObject
        });
      }
    }
  }, [state]);
  return React.createElement(React.Fragment, null, React.createElement(reactstrap.Form, {
    onSubmit: onFormSubmit
  }, formItems), React.createElement(ModalSpinner, {
    isOpen: modal.open,
    type: modal.type,
    message: modal.message,
    onDismiss: function onDismiss() {
      return setModal(function (values) {
        return _extends({}, values, {
          open: false
        });
      });
    }
  }));
});

exports.default = index;
