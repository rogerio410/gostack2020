import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

abstract class AuditBaseModel {
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default AuditBaseModel
