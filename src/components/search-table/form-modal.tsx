import { App, Form, Modal } from 'antd'
import type { ReactNode } from 'react'
import { useSearchTable } from './hooks'

interface FormModalProps {
  children: ReactNode
  onCreate: (values: Record<string, unknown>) => Promise<void>
  onUpdate: (id: string, values: Record<string, unknown>) => Promise<void>
  title?: string
  width?: number
}

export function FormModal<T>({
  children,
  onCreate,
  onUpdate,
  title,
  width = 600,
}: FormModalProps) {
  const { state, actions, name } = useSearchTable<T>()
  const { message } = App.useApp()
  const [form] = Form.useForm()

  const isEdit = state.editingRecord !== null
  const modalTitle = title ?? (isEdit ? `编辑${name}` : `新增${name}`)

  const handleCancel = () => {
    form.resetFields()
    actions.closeModal()
  }

  const handleOk = async () => {
    const values = await form.validateFields()

    if (isEdit) {
      const id = String(
        (state.editingRecord as Record<string, unknown>)?.[state.rowKey] ?? '',
      )
      await onUpdate(id, values)
    } else {
      await onCreate(values)
    }

    message.success(isEdit ? '编辑成功' : '新增成功')
    form.resetFields()
    actions.closeModal()
    actions.refresh()
  }

  return (
    <Modal
      title={modalTitle}
      open={state.modalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      width={width}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={state.editingRecord ?? undefined}
      >
        {children}
      </Form>
    </Modal>
  )
}
