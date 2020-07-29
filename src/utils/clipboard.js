import Vue from 'vue'
import ClipboardJS from 'clipboard'
import i18n from '../lang'

function clipboardSuccess() {
  Vue.prototype.$message({
    message: i18n.t('common.copysucc'),
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  Vue.prototype.$message({
    message:i18n.t('common.copyfail'),
    type: 'error'
  })
}

export default function handleClipboard(text, event) {
  const clipboard = new ClipboardJS(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
