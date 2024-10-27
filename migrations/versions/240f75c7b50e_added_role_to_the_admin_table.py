"""added role to the admin table

Revision ID: 240f75c7b50e
Revises: f5619aa0c920
Create Date: 2024-10-27 12:16:55.716616

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '240f75c7b50e'
down_revision = 'f5619aa0c920'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('administrators', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'roles', ['role_id'], ['role_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('administrators', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('role_id')

    # ### end Alembic commands ###
